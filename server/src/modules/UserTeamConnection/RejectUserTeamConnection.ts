import { ID, Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import isAuth from '../../middleware/isAuth';
import { getManager } from 'typeorm';
import UserTeamConnection from '../../entity/UserTeamConnection';
import isUserTeamConnectionAccessible from '../../middleware/isUserTeamConnectionAccessible';

@Resolver()
export default class RejectUserTeamCOnnectionResolver {

    @UseMiddleware(isAuth, isUserTeamConnectionAccessible)
    @Mutation(() => ID)
    async rejectUserTeamConnection(
        @Arg('con_id') con_id: number
    ): Promise<number> {

        await getManager().transaction('REPEATABLE READ', async (transactionalEntityManager) => {

            const con = await transactionalEntityManager.findOne(UserTeamConnection, { where: { con_id } });

            if (!con) {
                throw Error('Connection doesnt exist!');
            }

            if (con.confirmed) {
                throw Error('Cannot reject confirmed invitation!')
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