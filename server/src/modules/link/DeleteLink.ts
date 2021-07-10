import { Arg, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Link from "../../entity/Link";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isLinkAccessible from "../../middleware/isLinkAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamOwner from "../../middleware/isTeamOwner";

@Resolver()
export default class DeleteLinkResolver {

    @UseMiddleware(isAuth,checkTypeOfProject,isTeamOwner,isProjectAccessible,isLinkAccessible)
    @Mutation(() => ID)
    async deleteLink(
        @Arg('link_id') link_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<number> {

        const result = await Link.delete({link_id});

        if (!result.affected) {
            throw Error('Project doesnt exist!');
        }

        if (result.affected === 0) {
            throw Error('Project doesnt exist!');
        }

        return link_id;
    }

}