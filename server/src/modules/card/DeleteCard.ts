import { PubSub, Arg, Mutation, Resolver, UseMiddleware, Ctx } from "type-graphql";
import Card from "../../entity/Card";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import DeleteCardResponse from "./deleteCard/deleteCardResponse";
import ListenerResponse from "../shared/ListenerResponse";
import { DELETE_CARD } from '../project/ProjectListener';
import { PubSub as PubSubType } from 'graphql-subscriptions';
import MyContext from "../../types/MyContext";

interface RawItem {
    order_index: number,
    list_id: number
}

@Resolver()
export default class DeleteCardResolver {

    @UseMiddleware(isAuth, isCardAccessible, checkIfTeamAdmin)
    @Mutation(() => DeleteCardResponse)
    async deleteCard(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('card_id') card_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<DeleteCardResponse> {

        const res = new DeleteCardResponse();

        await getManager().transaction("SERIALIZABLE", async (transactionalEntityManager) => {

            res.card_id = card_id;

            const result = await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(Card)
                .where('card_id = :card_id', { card_id })
                .returning(['order_index', 'list_id'])
                .execute();


            if (!result.affected) {
                throw Error('Card doesnt exist!');
            }

            if (result.affected === 0) {
                throw Error('Card doesnt exist!');
            }

            const rawRes: RawItem = result.raw[0];
            const order_index = rawRes.order_index;
            const list_id = rawRes.list_id;
            await transactionalEntityManager
                .createQueryBuilder()
                .update(Card)
                .set({ order_index: () => 'order_index-1' })
                .where('order_index >:order_index', { order_index })
                .andWhere('list_id= :list_id', { list_id })
                .execute();

            res.list_id = list_id;
        });

        await pubsub.publish(DELETE_CARD, {
            project_id,
            user_id: ctx.payload.user_id,
            editProject: undefined,
            topic: DELETE_CARD,
            deleteCard: res,
            card_id
        } as ListenerResponse);

        return res;
    }

}