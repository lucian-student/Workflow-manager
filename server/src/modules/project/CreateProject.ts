import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Project from "../../entity/Project";
import isAuth from "../../middleware/isAuth";
import MyContext from "../../types/MyContext";
import CreateProjectInput from "./createProject/CreateProjectInput";
import User from "../../entity/User";
import Team from "../../entity/Team";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isTeamOwner from "../../middleware/isTeamOwner";


@Resolver()
export default class CreateProjectResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamOwner)
    @Mutation(() => Project)
    async createProject(
        @Arg('data') data: CreateProjectInput,
        @Ctx() ctx: MyContext,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Project> {
        const user_id: number = ctx.payload.user_id;
        const { status, name, deadline, description } = data;

        const project = new Project();
        project.status = status;
        project.name = name;
        project.deadline = deadline;
        project.description = description;
        if (team_id) {
            project.team = { team_id } as Team;
        } else {
            project.user = { user_id } as User;
        }

        return await project.save();
    }

}