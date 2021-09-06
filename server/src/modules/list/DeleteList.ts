import { PubSub, Ctx, ID, Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import List from "../../entity/List";
import { getManager } from "typeorm";
import isListAccessible from "../../middleware/isListAccessible";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import MyContext from "../../types/MyContext";
import ListenerResponse from "../shared/ListenerResponse";
import { DELETE_LIST } from '../project/ProjectListener';

interface RawItem {
    order_index: number
}

@Resolver()
export default class DeleteListResolver {

    @UseMiddleware(isAuth, isListAccessible, checkIfTeamAdmin)
    @Mutation(() => ID)
    async deleteList(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('project_id') project_id: number,
        @Arg('list_id') list_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<number> {

        await getManager().transaction("SERIALIZABLE", async (transactionalEntityManager) => {
            const result = await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(List)
                .where('list_id = :list_id', { list_id })
                .returning(['order_index'])
                .execute();

            if (!result.affected) {
                throw Error('List doesnt exist!');
            }

            if (result.affected === 0) {
                throw Error('List doesnt exist!');
            }
            const rawRes: RawItem = result.raw[0];
            const order_index = rawRes.order_index;

            await transactionalEntityManager
                .createQueryBuilder()
                .update(List)
                .set({ order_index: () => 'order_index-1' })
                .where('order_index >:order_index', { order_index })
                .andWhere('project_id= :project_id', { project_id })
                .execute();
        });

        pubsub.publish(DELETE_LIST, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: DELETE_LIST,
            deleteList: list_id
        } as ListenerResponse);

        return list_id;
    }

}