import { PubSub, Ctx, Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Todo from "../../entity/Todo";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isAuth from "../../middleware/isAuth";
import isTodoAccessible from "../../middleware/isTodoAccessible";
import { getManager } from 'typeorm';
import DeleteTodoResponse from "./deleteTodo/DeleteTodoResponse";
import Card from "../../entity/Card";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import { DELETE_TODO } from '../project/ProjectListener';
import MyContext from "../../types/MyContext";
import ListenerResponse from "../shared/ListenerResponse";

@Resolver()
export default class DeleteTodoResolver {

    @UseMiddleware(isAuth, isTodoAccessible, checkIfTeamAdmin)
    @Mutation(() => DeleteTodoResponse)
    async deleteTodo(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('todo_id') todo_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<DeleteTodoResponse> {

        const res = new DeleteTodoResponse();

        await getManager().transaction("REPEATABLE READ", async (transactionalEntityManager) => {

            const list: { list_id: number } = await transactionalEntityManager
                .createQueryBuilder()
                .select('t2.list_id', 'list_id')
                .from(Todo, 't1')
                .where('t1.todo_id= :todo_id', { todo_id })
                .innerJoin(Card, 't2', 't2.card_id=t1.card_id')
                .getRawOne();

            if (!list) {
                throw Error('List doesnt exist!');
            }

            res.list_id = list.list_id;

            const result = await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(Todo)
                .where('todo_id= :todo_id', { todo_id })
                .returning('card_id')
                .execute();

            if (!result.affected) {
                throw Error('Project doesnt exist!');
            }

            if (result.affected === 0) {
                throw Error('Project doesnt exist!');
            }

            res.todo_id = todo_id;

            res.card_id = result.raw[0].card_id

        });

        pubsub.publish(DELETE_TODO,{
            project_id,
            user_id: ctx.payload.user_id,
            topic: DELETE_TODO,
            card_id:res.card_id,
            deleteTodo:res
        } as ListenerResponse);

        return res;
    }

}