import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import isAuth from '../../middleware/isAuth';
import { getManager } from 'typeorm';
import getTeamRole from '../../middleware/getTeamRole';
import GetTeamMembersResponse from './getTeamMembers/GetTeamMembersResponse';

@Resolver()
export default class GetTeamMembersResolver {

    @UseMiddleware(isAuth, getTeamRole)
    @Query(() => GetTeamMembersResponse)
    async getTeamMembers(
        @Arg('team_id') team_id: number,
        @Arg('sort_option') sort_option: string,
        @Arg('search', { nullable: true }) search?: string,
    ): Promise<GetTeamMembersResponse> {

        let search_string = '%' + '' + '%';

        if (search) {
            search_string = '%' + search + '%';
        }

        const cons = await getManager()
            .query(`
                select user_team_connection.*, public.user.username from user_team_connection
                inner join public.user on public.user.user_id=user_team_connection.user_id
                where team_id=$1 
                and confirmed=true
                and lower(public.user.username) like lower($2)
                ORDER BY 
                case when $3='role_asc' then role end ASC ,
                case when $3='role_desc' then role end DESC
            `, [team_id, search_string, sort_option])

        return {
            team_id,
            cons
        }
    }

}