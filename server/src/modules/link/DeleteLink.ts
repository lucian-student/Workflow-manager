import { PubSub, Ctx, Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Link from "../../entity/Link";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isAuth from "../../middleware/isAuth";
import isLinkAccessible from "../../middleware/isLinkAccessible";
import { getManager } from 'typeorm';
import DeleteLinkResponse from "./deleteLink/DeleteLinkResponse";
import Card from "../../entity/Card";
import { PubSub as PubSubTypes } from 'graphql-subscriptions';
import MyContext from "../../types/MyContext";
import ListenerResponse from "../shared/ListenerResponse";
import { DELETE_LINK } from '../project/ProjectListener';

@Resolver()
export default class DeleteLinkResolver {

    @UseMiddleware(isAuth, isLinkAccessible, checkIfTeamAdmin)
    @Mutation(() => DeleteLinkResponse)
    async deleteLink(
        @PubSub() pubsub: PubSubTypes,
        @Ctx() ctx: MyContext,
        @Arg('link_id') link_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<DeleteLinkResponse> {

        const res = new DeleteLinkResponse();

        await getManager().transaction("REPEATABLE READ", async (transactionalEntityManager) => {

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

            res.list_id = list.list_id



            const result = await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(Link)
                .where('link_id= :link_id', { link_id })
                .returning('card_id')
                .execute();

            if (!result.affected) {
                throw Error('Project doesnt exist!');
            }

            if (result.affected === 0) {
                throw Error('Project doesnt exist!');
            }

            res.link_id = link_id;

            res.card_id = result.raw[0].card_id
        });

        pubsub.publish(DELETE_LINK, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: DELETE_LINK,
            deleteLink: res,
            card_id: Number(res.card_id)
        } as ListenerResponse);

        return res;
    }

}