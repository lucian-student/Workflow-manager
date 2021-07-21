import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import Project from '../entity/Project';
import { getManager } from 'typeorm';
import Team from "../entity/Team";
import UserTeamConnection from "../entity/UserTeamConnection";

interface Arguments {
    team_id?: number,
    project_id: number
}

const isProjectAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {
    const user_id = context.payload.user_id;

    const project_id = (args as Arguments).project_id;
    const team_id = (args as Arguments).team_id;

    if (team_id) {
        const result = await getManager()
            .createQueryBuilder()
            .select('t1.project_id', 'project_id')
            .addSelect('t3.role', 'role')
            .from(Project, 't1')
            .innerJoin(Team, 't2', 't2.team_id=t1.team_id')
            .innerJoin(UserTeamConnection, 't3', 't3.team_id=t2.team_id')
            .where('t3.user_id= :user_id', { user_id })
            .andWhere('t1.project_id= :project_id', { project_id })
            .getRawOne();
        if (!result) {
            throw new Error('Project doesnt exist!');
        }

        context.payload.role = result.role;

        return next();
    }

    if (!team_id) {
        const user_id = context.payload.user_id;
        const project_id = (args as Arguments).project_id;
        const project = await Project.findOne({ where: { project_id } });
        if (!project) {
            //either project doesnt exist or
            throw new Error('Project doesnt exist!');
        }

        if (Number(project.user_id) !== user_id) {
            throw new Error('Access denied! You dont have permission to perform this action!');
        }
        return next();
    }

    return next();
}

export default isProjectAccessible;


/*if (!type_of_project) {
     throw new Error("Access denied! You dont have permission to perform this action!");
 }

 if (type_of_project === 'user') {
     const user_id = context.payload.user_id;
     const project_id = (args as Arguments).project_id;
     const project = await Project.findOne({ where: { project_id } });
     if (!project) {
         //either project doesnt exist or
         throw new Error('Project doesnt exist!');
     }

     if (Number(project.user_id) !== user_id) {
         throw new Error('Access denied! You dont have permission to perform this action!');
     }

     return next();
 }

 if (type_of_project === 'team') {
     //check if project belongs to team
 }*/