import { PubSub, Ctx, Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Todo from "../../entity/Todo";
import isAuth from "../../middleware/isAuth";
import isTodoAccessible from "../../middleware/isTodoAccessible";
import TodoInput from "./shared/TodoInput";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import TodoResponse from "./shared/TodoResponse";
import Card from "../../entity/Card";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import { EDIT_TODO } from '../project/ProjectListener';
import MyContext from "../../types/MyContext";
import ListenerResponse from "../shared/ListenerResponse";

@Resolver()
export default class EditTodoResolver {

    @UseMiddleware(isAuth, isTodoAccessible, checkIfTeamAdmin)
    @Mutation(() => TodoResponse)
    async editTodo(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('data') data: TodoInput,
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
                    name: data.name.trimEnd().trimStart().replace(/\s+/g, " ")
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

            console.log(list);

            if (!list) {
                throw Error('List doesnt exist!');
            }

            res.list_id = list.list_id
        });

        pubsub.publish(EDIT_TODO, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: EDIT_TODO,
            card_id: res.todo.card_id,
            editTodo: res
        } as ListenerResponse);

        return res;

    }

}