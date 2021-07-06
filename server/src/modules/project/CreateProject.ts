import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Project from "../../entity/Project";
import isAuth from "../../middleware/isAuth";
import MyContext from "../../types/MyContext";
import CreateProjectInput from "./createProject/CreateProjectInput";
import User from "../../entity/User";

@Resolver()
export default class CreateProjectResolver {

    @UseMiddleware(isAuth)
    @Mutation(() => Project)
    async createProject(
        @Arg('data') data: CreateProjectInput,
        @Ctx() ctx: MyContext
    ): Promise<Project> {
        const user_id: number = ctx.payload.user_id;
        const { status, name, deadline, description } = data;

        const project = new Project();
        project.user = { user_id } as User;
        project.status = status;
        project.name = name;
        project.deadline = deadline;
        project.description = description;

        return await project.save();
    }

}