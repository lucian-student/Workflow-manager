import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import checkIfTeamOwner from '../../middleware/checkIfTeamOwner';
import getTeamRole from '../../middleware/getTeamRole';
import isAuth from '../../middleware/isAuth';
import ChangeRoleResponse from './changeRoleResponse/ChangeRoleResponse';
import UserTeamConnection from '../../entity/UserTeamConnection';
import { getManager } from 'typeorm';
import MyContext from '../../types/MyContext';
import ChangeRoleInput from './changeRole/ChangeRoleInput';

@Resolver()
export default class ChangeRoleResolver {

    @UseMiddleware(isAuth, getTeamRole, checkIfTeamOwner)
    @Mutation(() => ChangeRoleResponse)
    async changeRole(
        @Arg('team_id') team_id: number,
        @Arg('data') data: ChangeRoleInput,
        @Arg('con_id') con_id: number,
        @Ctx() ctx: MyContext
    ): Promise<ChangeRoleResponse> {

        await getManager().transaction('REPEATABLE READ', async (transactionalEntityManager) => {

            const cons = await transactionalEntityManager.find(UserTeamConnection, { where: { team_id } });

            const index = cons.findIndex(con => con_id === Number(con.con_id));

            if (cons[index].role === 1 && Number(cons[index].user_id) !== ctx.payload.user_id) {
                throw Error('You cannot change role of other owners!');
            }

            let ownerCount = 0;

            cons.forEach(con => {
                if (con.role === 1) {
                    ownerCount++;
                }
            });

            if (ownerCount === 1 && cons[index].role === 1) {
                throw Error('There always has to be one owner in the team!');
            }

            await transactionalEntityManager.update(UserTeamConnection, { con_id }, { role: data.role });

        });

        return {
            role: data.role,
            con_id
        }
    }
}