import { Arg, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Todo from "../../entity/Todo";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isAuth from "../../middleware/isAuth";
import isTodoAccessible from "../../middleware/isTodoAccessible";

@Resolver()
export default class DeleteTodoResolver {

    @UseMiddleware(isAuth, isTodoAccessible, checkIfTeamAdmin)
    @Mutation(() => ID)
    async deleteTodo(
        @Arg('todo_id') todo_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<number> {

        const result = await Todo.delete({ todo_id });

        if (!result.affected) {
            throw Error('Project doesnt exist!');
        }

        if (result.affected === 0) {
            throw Error('Project doesnt exist!');
        }

        return todo_id;
    }

}