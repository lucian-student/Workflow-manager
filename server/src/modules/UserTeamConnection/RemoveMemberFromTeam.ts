import { Arg, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import checkIfTeamOwner from '../../middleware/checkIfTeamOwner';
import getTeamRole from '../../middleware/getTeamRole';
import isAuth from '../../middleware/isAuth';
import { getManager } from 'typeorm';
import UserTeamConnection from '../../entity/UserTeamConnection';

@Resolver()
export default class RemoveMemberFromTeamResolver {

    @UseMiddleware(isAuth, getTeamRole, checkIfTeamOwner)
    @Mutation(() => ID)
    async removeMemberFromTeam(
        @Arg('con_id') con_id: number,
        @Arg('team_id') team_id: number
    ): Promise<number> {

        await getManager().transaction('REPEATABLE READ', async (transactionalEntityManager) => {

            const con = await transactionalEntityManager.findOne(UserTeamConnection, { where: { con_id } });

            if (!con) {
                throw Error('Connection doesnt exist!');
            }

            if (con.role === 1) {
                throw Error('Cannot remove owner from the Team!');
            }

            const deleteRes = await transactionalEntityManager.delete(UserTeamConnection, { con_id });

            if (!deleteRes.affected) {
                throw Error('Connection doesnt exist!');
            }

            if (deleteRes.affected === 0) {
                throw Error('Connection doesnt exist!');
            }

        });

        return con_id;
    }

}