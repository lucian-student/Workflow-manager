import { Arg, Ctx, Mutation, PubSub, Resolver, UseMiddleware } from "type-graphql";
import { getManager, EntityManager } from "typeorm";
import Card from "../../entity/Card";
import List from "../../entity/List";
import Project from "../../entity/Project";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import MoveCardResponse from "./moveCard/MoveCardResponse";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import MyContext from "../../types/MyContext";
import { MOVE_CARD } from '../project/ProjectListener';
import ListenerResponse from "../shared/ListenerResponse";

@Resolver()
export default class MoveCard {

    @UseMiddleware(isAuth, isCardAccessible, checkIfTeamAdmin)
    @Mutation(() => MoveCardResponse)
    async moveCard(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('list_id') list_id: number,
        @Arg('end_index') end_index: number,
        @Arg('project_id') project_id: number,
        @Arg('card_id') card_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<MoveCardResponse> {


        async function orderList(manager: EntityManager, order_index: number, new_index: number) {
            if (order_index > new_index) {
                await manager
                    .createQueryBuilder()
                    .update(Card)
                    .set({ order_index: () => 'order_index+1' })
                    .where('list_id= :list_id', { list_id })
                    .andWhere('order_index >=:new_index', { new_index })
                    .andWhere('order_index <=:order_index', { order_index })
                    .execute();
            } else if (order_index < new_index) {
                await manager
                    .createQueryBuilder()
                    .update(Card)
                    .set({ order_index: () => 'order_index-1' })
                    .where('list_id= :list_id', { list_id })
                    .andWhere('order_index >=:order_index', { order_index })
                    .andWhere('order_index <=:new_index', { new_index })
                    .execute();
            }
        }

        async function orderNewList(manager: EntityManager, order_index: number) {
            await manager
                .createQueryBuilder()
                .update(Card)
                .set({ order_index: () => 'order_index+1' })
                .where('list_id= :list_id', { list_id })
                .andWhere('order_index >=:order_index', { order_index })
                .execute();
        }

        async function fixList(manager: EntityManager, order_index: number, card: Card) {
            await manager
                .createQueryBuilder()
                .update(Card)
                .set({ order_index: () => 'order_index-1' })
                .where('list_id= :list_id', { list_id: card.list_id })
                .andWhere('order_index >=:order_index', { order_index })
                .execute();
        }

        async function getCardCount(manager: EntityManager): Promise<number> {

            const list: { card_count: number } | undefined = await manager
                .createQueryBuilder()
                .select('count(distinct t3.card_id)', 'card_count')
                .from(List, 't1')
                .innerJoin(Project, 't2', 't2.project_id=t1.project_id')
                .leftJoin(Card, 't3', 't1.list_id=t3.list_id')
                .groupBy('t1.list_id')
                .where('t2.project_id= :project_id', { project_id })
                .andWhere('t1.list_id= :list_id', { list_id })
                .getRawOne();

            if (!list) {
                throw new Error('Access denied! You dont have permission to perform this action!');
            }

            return list.card_count;
        }

        const res = new MoveCardResponse();

        await getManager().transaction("SERIALIZABLE", async (transactionalEntityManager) => {
            const card = await transactionalEntityManager.findOne(Card, { where: { card_id } });

            if (!card) {
                throw Error('Card doesnt exist!');
            }

            const order_index = card.order_index;

            console.log(Number(card.list_id) !== list_id);

            if (Number(card.list_id) !== list_id) {
                console.log('different list');
                // check if list belongs to correct project

                // check if endIndex is bigger than the biggest+1 or smaller

                const count = await getCardCount(transactionalEntityManager);

                let finish_index = end_index;

                if (count < finish_index) {
                    finish_index = count;
                }

                if (0 > finish_index) {
                    finish_index = 0;
                }

                //move card between list
                await orderNewList(transactionalEntityManager, finish_index);

                await fixList(transactionalEntityManager, order_index, card);

                await transactionalEntityManager.update(Card, { card_id }, { list_id, order_index: finish_index });

                res.list_id = list_id;
                res.old_list_id = card.list_id;
                res.order_index = finish_index;
                res.card_id = card_id;

            } else {

                console.log('same list');

                const count = await getCardCount(transactionalEntityManager);

                let finish_index = end_index;

                if (count - 1 < finish_index) {
                    finish_index = count - 1;
                }

                if (0 > finish_index) {
                    finish_index = 0;
                }

                await orderList(transactionalEntityManager, order_index, finish_index);

                res.list_id = list_id;
                res.old_list_id = list_id;
                res.order_index = finish_index;
                res.card_id = card_id;

                console.log(res);

                // check if endIndex is bigger than the biggest
                await transactionalEntityManager.update(Card, { card_id }, { order_index: finish_index });
            }
        });

        pubsub.publish(MOVE_CARD, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: MOVE_CARD,
            moveCard: res,
            card_id
        } as ListenerResponse);

        return res;
    }

}