import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import isAuth from '../../middleware/isAuth';
import GetUserTeamConnectionsResponse from './getUserTeamConnections/GetUserTeamConnectionsResponse';
import { getManager } from 'typeorm';
import UserTeamConnection from '../../entity/UserTeamConnection';
import MyContext from '../../types/MyContext';

@Resolver()
export default class GetUserTeamConnectionsResolver {

    @UseMiddleware(isAuth)
    @Query(() => GetUserTeamConnectionsResponse)
    async getUserTeamConnections(
        @Ctx() ctx: MyContext
    ): Promise<GetUserTeamConnectionsResponse> {

        const user_id = ctx.payload.user_id;

        const cons = await getManager()
            .createQueryBuilder()
            .select()
            .from(UserTeamConnection, 't1')
            .where('t1.user_id= :user_id', { user_id })
            .getMany();

        return {
            user_id,
            cons
        }
    }

}