import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import List from '../entity/List';

interface Arguments {
    team_id: number,
    project_id: number
    list_id: number
}
const isListAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {

    const { project_id, list_id } = args as Arguments;

    const list = await List.findOne({ where: { list_id } });

    if (!list) {
        //either project doesnt exist or 
        throw new Error('List doesnt exist!');
    }

    if (Number(list.project_id) !== project_id) {
        throw new Error('Access denied! You dont have permission to perform this action!');
    }

    return next();
}

export default isListAccessible;