import { PubSub, Ctx, Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import Todo from '../../entity/Todo';
import { getManager } from 'typeorm';
import TodoResponse from './shared/TodoResponse';
import Card from '../../entity/Card';
import { PubSub as PubSubType } from 'graphql-subscriptions';
import { DONE_TODO } from '../project/ProjectListener';
import MyContext from "../../types/MyContext";
import ListenerResponse from '../shared/ListenerResponse';
import isAuth from '../../middleware/isAuth';
import isTodoAccessible from '../../middleware/isTodoAccessible';
import checkIfTeamAdmin from '../../middleware/checkIfTeamAdmin';

@Resolver()
export default class DoneTodoResolver {

    @UseMiddleware(isAuth, isTodoAccessible, checkIfTeamAdmin)
    @Mutation(() => TodoResponse)
    async doneTodo(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('done') done: boolean,
        @Arg('todo_id') todo_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<TodoResponse> {

        const res = new TodoResponse();

        await getManager().transaction("REPEATABLE READ", async (transactionalEntityManager) => {

            const result = await transactionalEntityManager
                .createQueryBuilder()
                .update(Todo)
                .set({
                    done
                })
                .where('todo_id= :todo_id', { todo_id })
                .returning('*')
                .execute();

            if (!result.raw) {
                throw Error('Todo doesnt exist!');
            }

            res.todo = result.raw[0] as Todo;

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

            res.list_id = list.list_id
        });

        pubsub.publish(DONE_TODO, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: DONE_TODO,
            card_id: res.todo.card_id,
            doneTodo: res
        } as ListenerResponse);

        return res;
    }

}