import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Todo from "../../entity/Todo";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import TodoInput from "./shared/TodoInput";
import Card from "../../entity/Card";
import Project from "../../entity/Project";

@Resolver()
export default class CreateTodoResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin, isProjectAccessible, isCardAccessible)
    @Mutation(() => Todo)
    async createTodo(
        @Arg('data') data: TodoInput,
        @Arg('project_id') project_id: number,
        @Arg('card_id') card_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Todo> {
        const { name, description } = data;

        const todo = new Todo();

        todo.name = name;
        todo.description = description;
        todo.card = {card_id} as Card;
        todo.project = {project_id} as Project;

        return await todo.save();
    }

}