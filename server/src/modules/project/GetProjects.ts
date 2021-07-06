import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import Project from "../../entity/Project";
import MyContext from "../../types/MyContext";
import { getManager } from "typeorm";
import UserTeamConnection from "../../entity/UserTeamConnection";
import Team from "../../entity/Team";

@Resolver()
export default class GetProjectsResolver {

    @UseMiddleware(isAuth)
    @Query(() => [Project])
    async getProjects(
        @Ctx() ctx: MyContext
    ): Promise<Project[]> {
        const user_id = ctx.payload.user_id;

        let projects: Project[] = [];

        const projects1 = await Project.find({ where: { user_id, team_id: null } });

        if (projects1) {
            projects = projects1;
        }

        const projects2 = await getManager().
            createQueryBuilder(UserTeamConnection, 't1').
            select('t3.project_id', 'project_id').
            addSelect('t3.status', 'status').
            addSelect('t3.description', 'description').
            addSelect('t3.name', 'name').
            addSelect('t3.deadline', 'deadline').
            where('t1.user_id = :user_id', { user_id }).
            innerJoin(Team, 't2', 't2.team_id = t1.team_id').
            innerJoin(Project, 't3', 't3.team_id=t2.team_id').
            orderBy('t3.last_updated', 'DESC').
            getRawMany() as Project[];

        if (projects2) {
            projects.concat(projects2);
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