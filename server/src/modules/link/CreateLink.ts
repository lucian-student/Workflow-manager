import { PubSub, Arg, Mutation, Resolver, UseMiddleware, Ctx } from "type-graphql";
import Card from "../../entity/Card";
import Link from "../../entity/Link";
import Project from "../../entity/Project";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import LinkInput from "./shared/LinkInput";
import { getManager } from 'typeorm';
import LinkResponse from "./shared/LinkResponse";
import { PubSub as PubSubType } from "graphql-subscriptions";
import MyContext from "../../types/MyContext";
import ListenerResponse from "../shared/ListenerResponse";
import { CREATE_LINK } from '../project/ProjectListener';

@Resolver()
export default class CreateLinkResolver {

    @UseMiddleware(isAuth, isCardAccessible, checkIfTeamAdmin)
    @Mutation(() => LinkResponse)
    async createLink(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('data') data: LinkInput,
        @Arg('card_id') card_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<LinkResponse> {
        const { name, url } = data;

        let link = new Link();
        link.name = name.trimStart().trimEnd().replace(/\s+/g, " ");
        link.url = url;
        link.card = { card_id } as Card;
        link.project = { project_id } as Project;

        const linkResponse = new LinkResponse();

        await getManager().transaction("REPEATABLE READ", async (transactionalEntityManager) => {
            link = await transactionalEntityManager.save(link);

            linkResponse.link = link;

            const list: { list_id: number } = await transactionalEntityManager
                .createQueryBuilder()
                .select('t1.list_id', 'list_id')
                .from(Card, 't1')
                .where('t1.card_id= :card_id', { card_id })
                .getRawOne();

            if (!list) {
                throw Error('List doesnt exist!');
            }

            linkResponse.list_id = list.list_id;
        });

        pubsub.publish(CREATE_LINK, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: CREATE_LINK,
            createLink: linkResponse,
            card_id
        } as ListenerResponse);

        return linkResponse;
    }

}