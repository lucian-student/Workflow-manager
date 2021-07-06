import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import Project from '../entity/Project';
//import User from "../entity/User";

interface Arguments {
    project_id: number
}

const isMember: MiddlewareFn<MyContext> = async ({ context, args }, next) => {
    const user_id: number = context.payload.user_id;

    const project_id = (args as Arguments).project_id;

    //check if owner of project

    const project = await Project.findOne({ where: { project_id } });

    if (!project) {
        throw Error('Project doesnt exist!');
    }

    // check if  u have member  status in team

    let projectOwner = false;

    if (project.user_id) {
        projectOwner = Number(project.user_id) === user_id;
    }

    // if both checks fail issue error
    if (!projectOwner) {
        throw Error('You need to be at least admin to perform this action!');
    }

    return next();
}

export default isMember;