import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Card from "../../entity/Card";
import Link from "../../entity/Link";
import Project from "../../entity/Project";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import LinkInput from "./shared/LinkInput";

@Resolver()
export default class CreateLinkResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin, isProjectAccessible, isCardAccessible)
    @Mutation(() => Link)
    async createLink(
        @Arg('data') data: LinkInput,
        @Arg('card_id') card_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<Link> {
        const { name, url } = data;

        const link = new Link();

        link.name = name;
        link.url = url;
        link.card = { card_id } as Card;
        link.project = { project_id } as Project;

        return link.save();
    }

}