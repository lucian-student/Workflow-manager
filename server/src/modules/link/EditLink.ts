import { PubSub, Ctx, Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getManager } from "typeorm";
import Link from "../../entity/Link";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isAuth from "../../middleware/isAuth";
import isLinkAccessible from "../../middleware/isLinkAccessible";
import LinkInput from "./shared/LinkInput";
import LinkResponse from "./shared/LinkResponse";
import Card from "../../entity/Card";
import MyContext from "../../types/MyContext";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import { EDIT_LINK } from '../project/ProjectListener';
import ListenerResponse from "../shared/ListenerResponse";

@Resolver()
export default class EditLinkResolver {

    @UseMiddleware(isAuth, isLinkAccessible, checkIfTeamAdmin)
    @Mutation(() => LinkResponse)
    async editLink(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('data') data: LinkInput,
        @Arg('link_id') link_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<LinkResponse> {

        const linkResponse = new LinkResponse();

        await getManager().transaction("REPEATABLE READ", async (transactionalEntityManager) => {

            const result = await transactionalEntityManager
                .createQueryBuilder()
                .update(Link)
                .set({
                    ...data,
                    name: data.name.trimEnd().trimStart().replace(/\s+/g, " ")
                })
                .where('link_id= :link_id', { link_id })
                .returning('*')
                .execute();

            if (!result.raw) {
                throw Error('Link doesnt exist!');
            }

            linkResponse.link = result.raw[0] as Link


            const list: { list_id: number } = await transactionalEntityManager
                .createQueryBuilder()
                .select('t2.list_id', 'list_id')
                .from(Link, 't1')
                .where('t1.link_id= :link_id', { link_id })
                .innerJoin(Card, 't2', 't2.card_id=t1.card_id')
                .getRawOne();


            if (!list) {
                throw Error('List doesnt exist!');
            }

            linkResponse.list_id = list.list_id
        });

        pubsub.publish(EDIT_LINK, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: EDIT_LINK,
            editLink: linkResponse
        } as ListenerResponse);

        return linkResponse;
    }

}