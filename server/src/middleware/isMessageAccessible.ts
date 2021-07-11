import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import Message from '../entity/Message';

interface Arguments {
    project_id: number
    message_id: number
}
const isMessageAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {

    const user_id = context.payload.user_id;
    const { project_id, message_id } = args as Arguments;

    const message = await Message.findOne({ where: { message_id } });

    if (!message) {
        //either project doesnt exist or 
        throw new Error('Message doesnt exist!');
    }

    if (Number(message.project_id) !== project_id) {
        throw new Error('Access denied! You dont have permission to perform this action!');
    }


    if (Number(message.user_id) !== user_id) {
        throw new Error('Access denied! You dont have permission to perform this action!');
    }

    return next();
}

export default isMessageAccessible;