import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Todo from "../../entity/Todo";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import TodoInput from "./shared/TodoInput";
import Card from "../../entity/Card";
import Project from "../../entity/Project";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";

@Resolver()
export default class CreateTodoResolver {

    @UseMiddleware(isAuth, isCardAccessible, checkIfTeamAdmin)
    @Mutation(() => Todo)
    async createTodo(
        @Arg('data') data: TodoInput,
        @Arg('project_id') project_id: number,
        @Arg('card_id') card_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Todo> {
        const { name, description } = data;

        const todo = new Todo();

        todo.name = name.trimStart().trimEnd().replace(/\s+/g, " ");
        todo.description = description;
        todo.card = { card_id } as Card;
        todo.project = { project_id } as Project;

        return await todo.save();
    }

}