import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import isAuth from '../../middleware/isAuth';
import GetTeamInvitationResponse from './getTeamInvitations/GetTeamInvitationsResponse';
import { getManager } from 'typeorm';
import UserTeamConnection from '../../entity/UserTeamConnection';
import MyContext from '../../types/MyContext';
import Team from '../../entity/Team';

@Resolver()
export default class GetTeamInvitationsResolver {

    @UseMiddleware(isAuth)
    @Query(() => GetTeamInvitationResponse)
    async getTeamInvitations(
        @Ctx() ctx: MyContext
    ): Promise<GetTeamInvitationResponse> {

        const user_id = ctx.payload.user_id;

        const cons = await getManager()
            .createQueryBuilder()
            .select('t1.*')
            .select('t2.name', 'teamname')
            .from(UserTeamConnection, 't1')
            .where('t1.user_id= :user_id', { user_id })
            .andWhere('t1.confirmed=false')
            .innerJoin(Team, 't2', 't2.team_id=t1.team_id')
            .getRawMany() as UserTeamConnection[];

        return {
            user_id,
            cons
        }
    }
}