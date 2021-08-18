import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import isAuth from '../../middleware/isAuth';
import MyContext from '../../types/MyContext';
import Team from '../../entity/Team';
import Project from '../../entity/Project';
import UserTeamConnection from '../../entity/UserTeamConnection';
import GetTeamsResponse from './GetTeams/GetTeamsResponse';
import { getManager } from 'typeorm';

@Resolver()
export default class GetTeamsResolver {

    @UseMiddleware(isAuth)
    @Query(() => GetTeamsResponse)
    async getTeams(
        @Ctx() ctx: MyContext
    ): Promise<GetTeamsResponse> {
        const user_id = ctx.payload.user_id;

        const teams = await getManager()
            .createQueryBuilder()
            .select('t2.team_id', 'team_id')
            .addSelect('t2.name', 'name')
            .addSelect('t2.description', 'description')
            .addSelect('t2.last_active', 'last_active')
            .addSelect('t4.project_count', 'project_count')
            .addSelect('t4.user_count', 'user_count')
            .from(UserTeamConnection, 't1')
            .where('t1.user_id= :user_id', { user_id })
            .andWhere('t1.confirmed=true')
            .innerJoin(Team, 't2', 't1.team_id=t2.team_id')
            .innerJoin(qb => {
                const subQuery = qb
                    .select('count(distinct t5.project_Id)', 'project_count')
                    .addSelect('count(distinct t6.con_id)', 'user_count')
                    .addSelect('t3.team_id')
                    .from(Team, 't3')
                    .leftJoin(Project, 't5', 't5.team_id=t3.team_id')
                    .leftJoin(UserTeamConnection, 't6', 't6.team_id=t3.team_id')
                    .where('t6.confirmed=true')
                    .groupBy('t3.team_id')

                return subQuery;
            }, 't4', 't4.t3_team_id=t2.team_id')
            .orderBy('t2.last_active', 'DESC')
            .getRawMany();

        const res = new GetTeamsResponse();
        res.user_id = user_id;
        res.teams = teams;

        return res;
    }

}