import { Mutation, Resolver } from "type-graphql";
import Todo from "../../entity/Todo";

@Resolver()
export default class CreateTodoResolver {

    @Mutation(() => Todo)
    async createTodo(): Promise<Todo> {


        return new Todo();
    }

}