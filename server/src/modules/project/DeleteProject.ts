import { Arg, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Project from "../../entity/Project";
import isAuth from "../../middleware/isAuth";
import isOwner from "../../middleware/isOwner";

@Resolver()
export default class DeleteProjectResolver {

    @UseMiddleware(isAuth, isOwner)
    @Mutation(() => ID)
    async deleteProject(
        @Arg('project_id') project_id: number
    ): Promise<number> {

        const result = await Project.delete({ project_id });

        if (!result) {
            throw Error('Project doesnt exist!');
        }

        return project_id;
    }

}