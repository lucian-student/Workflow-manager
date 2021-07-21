import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getManager } from "typeorm";
import Link from "../../entity/Link";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isAuth from "../../middleware/isAuth";
import isLinkAccessible from "../../middleware/isLinkAccessible";
import LinkInput from "./shared/LinkInput";

@Resolver()
export default class EditLinkResolver {

    @UseMiddleware(isAuth, isLinkAccessible, checkIfTeamAdmin)
    @Mutation(() => Link, { nullable: true })
    async editLink(
        @Arg('data') data: LinkInput,
        @Arg('link_id') link_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<Link | null> {

        const result = await getManager()
            .createQueryBuilder()
            .update(Link)
            .set({ ...data })
            .where('link_id= :link_id', { link_id })
            .returning('*')
            .execute();

        if (!result.raw) {
            throw Error('Link doesnt exist!');
        }
        const link = result.raw[0] as Link

        return link;
    }

}