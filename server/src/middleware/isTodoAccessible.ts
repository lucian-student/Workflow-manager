import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import Todo from '../entity/Todo';

interface Arguments {
    project_id: number
    todo_id: number
}
const isTodoAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {

    const { project_id, todo_id } = args as Arguments;

    const todo = await Todo.findOne({ where: { todo_id } });

    if (!todo) {
        //either project doesnt exist or 
        throw new Error('Todo doesnt exist!');
    }

    if (Number(todo.project_id) !== project_id) {
        throw new Error('Access denied! You dont have permission to perform this action!');
    }

    return next();
}

export default isTodoAccessible;