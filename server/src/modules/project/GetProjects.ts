import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import Project from "../../entity/Project";
import MyContext from "../../types/MyContext";
import { getManager } from "typeorm";

@Resolver()
export default class GetProjectsResolver {

    @UseMiddleware(isAuth)
    @Query(() => [Project])
    async getProjects(
        @Ctx() ctx: MyContext,
        @Arg('sort_option') sort_option: string,
        @Arg('search', { nullable: true }) search?: string,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Project[]> {
        const user_id = ctx.payload.user_id;

        let search_string = '%' + '' + '%';

        if (search) {
            search_string = '%' + search + '%';
        }

        let projects: Project[] = [];

        if (!team_id) {
            projects = await getManager()
                .query(`
                select projects.* from
                ((SELECT *
                FROM project
                where user_id=$1
                and lower(project.name) like lower($2))
                UNION ALL
                (SELECT project.*
                FROM user_team_connection
                INNER JOIN team on team.team_id=user_team_connection.team_id
                INNER JOIN project on team.team_id=project.team_id
                where user_team_connection.user_id=$1
                and lower(project.name) like lower($2))) as projects
                ORDER BY 
                case when $3='last_viewed_asc' then last_updated end ASC ,
                case when $3='last_viewed_desc' then last_updated end DESC,
                case when $3='alphabetical_asc' then name end ASC,
                case when $3='alphabetical_desc' then name end DESC,
                case when $3='deadline_asc' then deadline end ASC,
                case when $3='deadline_desc' then deadline end DESC
        `, [user_id, search_string, sort_option]);
        } else {
            projects = await getManager()
                .query(`
                select * from project
                where team_id=$1
                and lower(project.name) like lower($2)
                ORDER BY 
                case when $3='last_viewed_asc' then last_updated end ASC ,
                case when $3='last_viewed_desc' then last_updated end DESC,
                case when $3='alphabetical_asc' then name end ASC,
                case when $3='alphabetical_desc' then name end DESC,
                case when $3='deadline_asc' then deadline end ASC,
                case when $3='deadline_desc' then deadline end DESC
            `, [team_id, search_string, sort_option])
        }


        return projects;
    }

}

/*
1st query
select * from project where user_id=$1 and team_id=null;
2nd query
select * from user_team_connection where user_id=$1
inner join team on team.team_id=user_team_connection.team_id
inner join projects on team.team_id=projects.team_id;
*/

/*let projects: Project[] = [];

const projects1 = await getManager()
    .createQueryBuilder(Project, 'project')
    .where('project.user_id = :user_id', { user_id })
    .orderBy('project.last_updated', 'DESC')
    .getMany();

if (projects1) {
    projects = projects1;
}

/* const projects2 = await getManager().
     createQueryBuilder().
     select('t3.project_id', 'project_id').
     from(UserTeamConnection, 't1').
     where('t1.user_id = :user_id', { user_id }).
     andWhere('t.confirmed =:confirmed', { confirmed: true }).
     innerJoin(Team, 't2', 't2.team_id = t1.team_id').
     innerJoinAndSelect(Project, 't3', 't3.team_id=t2.team_id').
     orderBy('t3.last_updated', 'DESC').
     getRawMany() as Project[];

 if (projects2) {
     projects.concat(projects2);
 }*/
