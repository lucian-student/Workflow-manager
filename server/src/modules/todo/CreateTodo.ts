import { PubSub, Ctx, Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Todo from "../../entity/Todo";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import TodoInput from "./shared/TodoInput";
import Card from "../../entity/Card";
import Project from "../../entity/Project";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import { getManager } from "typeorm";
import TodoResponse from "./shared/TodoResponse";
import MyContext from "../../types/MyContext";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import { CREATE_TODO } from '../project/ProjectListener';
import ListenerResponse from "../shared/ListenerResponse";

@Resolver()
export default class CreateTodoResolver {

    @UseMiddleware(isAuth, isCardAccessible, checkIfTeamAdmin)
    @Mutation(() => TodoResponse)
    async createTodo(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('data') data: TodoInput,
        @Arg('project_id') project_id: number,
        @Arg('card_id') card_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<TodoResponse> {
        const { name } = data;

        const res = new TodoResponse();

        await getManager().transaction("REPEATABLE READ", async (transactionalEntityManager) => {

            let todo = new Todo();

            todo.name = name.trimStart().trimEnd().replace(/\s+/g, " ");
            todo.card = { card_id } as Card;
            todo.project = { project_id } as Project;

            todo = await transactionalEntityManager.save(todo);

            res.todo = todo;

            const list: { list_id: number } = await transactionalEntityManager
                .createQueryBuilder()
                .select('t1.list_id', 'list_id')
                .from(Card, 't1')
                .where('t1.card_id= :card_id', { card_id })
                .getRawOne();

            if (!list) {
                throw Error('List doesnt exist!');
            }

            res.list_id = list.list_id;
        });

        pubsub.publish(CREATE_TODO,{
            project_id,
            user_id: ctx.payload.user_id,
            topic: CREATE_TODO,
            card_id,
            createTodo:res
        } as ListenerResponse);

        return res;
    }

}