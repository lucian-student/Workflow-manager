import { Arg, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import isAuth from '../../middleware/isAuth';
import { getManager } from 'typeorm';
import UserTeamConnection from '../../entity/UserTeamConnection';
import isUserTeamConnectionAccessible from '../../middleware/isUserTeamConnectionAccessible';

@Resolver()
export default class AcceptUserTeamConnectionResolver {

    @UseMiddleware(isAuth,isUserTeamConnectionAccessible)
    @Mutation(() => ID)
    async acceptUserTeamConnection(
        @Arg('con_id') con_id: number
    ): Promise<number> {

        const con = await getManager()
            .createQueryBuilder()
            .update(UserTeamConnection)
            .set({
                confirmed: true
            })
            .where('con_id= :con_id', { con_id })
            .returning('team_id')
            .execute();

        if (!con.raw) {
            throw Error('Connection doesnt exist!');
        }

        const result = con.raw[0] as { team_id: string };

        return Number(result.team_id);

    }
}