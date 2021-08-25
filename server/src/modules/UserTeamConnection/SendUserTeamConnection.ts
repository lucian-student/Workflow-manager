import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import checkIfTeamOwner from '../../middleware/checkIfTeamOwner';
import getTeamRole from '../../middleware/getTeamRole';
import isAuth from '../../middleware/isAuth';
import UserTeamConnectionInput from './shared/UserTeamConnectionInput';
import { getManager } from 'typeorm';
import UserTeamConnection from '../../entity/UserTeamConnection';
import User from '../../entity/User';

@Resolver()
export default class SendUserTeamConnectionResolver {

    @UseMiddleware(isAuth, getTeamRole, checkIfTeamOwner)
    @Mutation(() => Boolean)
    async sendUserTeamConnection(
        @Arg('team_id') team_id: number,
        @Arg('data') data: UserTeamConnectionInput
    ): Promise<boolean> {

        const { username, role } = data;

        await getManager().transaction('REPEATABLE READ', async (transactionalEntityManager) => {
            //check wheter invitation exists

            const inveitedUser = await transactionalEntityManager.findOne(User, { username });

            if (!inveitedUser) {
                throw Error('User doesnt exist!')
            }

            const check = await transactionalEntityManager.findOne(UserTeamConnection, { where: { user_id: inveitedUser.user_id, team_id } });

            if (check) {
                throw Error('You have already inveited that user!')
            }

            await transactionalEntityManager.create(UserTeamConnection, {
                role,
                user_id: Number(inveitedUser.user_id),
                team_id
            }).save();

        });

        return true;
    }
}