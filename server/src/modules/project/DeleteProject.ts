import { Arg, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Project from "../../entity/Project";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamOwner from "../../middleware/isTeamOwner";


@Resolver()
export default class DeleteProjectResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamOwner, isProjectAccessible)
    @Mutation(() => ID)
    async deleteProject(
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<number> {

        const result = await Project.delete({ project_id });

        if (!result.affected) {
            throw Error('Project doesnt exist!');
        }

        if (result.affected === 0) {
            throw Error('Project doesnt exist!');
        }

        return project_id;
    }

}