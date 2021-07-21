import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Message from "../../entity/Message";
import isAuth from "../../middleware/isAuth";
import isMessageAccessible from "../../middleware/isMessageAccessible";
import MessageInput from "./shared/MessageInput";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";

@Resolver()
export default class EditMessageResolover {

    @UseMiddleware(isAuth, isMessageAccessible, checkIfTeamAdmin)
    @Mutation(() => Message)
    async editMessage(
        @Arg('data') data: MessageInput,
        @Arg('project_id') project_id: number,
        @Arg('message_id') message_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Message> {
        const result = await getManager()
            .createQueryBuilder()
            .update(Message)
            .set({
                ...data
            })
            .where('message_id= :message_id', { message_id })
            .returning('*')
            .execute();
        if (!result.raw) {
            throw Error('Message doesnt exist!');
        }

        const message = result.raw[0] as Message;

        return message;
    }

}