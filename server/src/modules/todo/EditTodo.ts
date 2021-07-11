import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Todo from "../../entity/Todo";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import isTodoAccessible from "../../middleware/isTodoAccessible";
import TodoInput from "./shared/TodoInput";
import { getManager } from "typeorm";

@Resolver()
export default class EditTodoResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin, isProjectAccessible, isTodoAccessible)
    @Mutation(() => Todo, { nullable: true })
    async editTodo(
        @Arg('data') data: TodoInput,
        @Arg('todo_id') todo_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Todo | null> {

        const result = await getManager()
            .createQueryBuilder()
            .update(Todo)
            .set({ ...data })
            .where('todo_id= :todo_id', { todo_id })
            .returning('*')
            .execute();

        if (!result.raw) {
            throw Error('Todo doesnt exist!');
        }
        const todo = result.raw[0] as Todo

        return todo;

    }

}