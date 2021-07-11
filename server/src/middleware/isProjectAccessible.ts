import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import Project from '../entity/Project';

interface Arguments {
    team_id: number,
    project_id: number
}
const isProjectAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {
    const type_of_project: string | undefined = context.payload.type_of_project;

    if (!type_of_project) {
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
    }

    return next();
}

export default isProjectAccessible;