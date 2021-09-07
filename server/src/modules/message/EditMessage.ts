import { PubSub, Ctx, Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Message from "../../entity/Message";
import isAuth from "../../middleware/isAuth";
import isMessageAccessible from "../../middleware/isMessageAccessible";
import MessageInput from "./shared/MessageInput";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import MessageResponse from "./shared/MessageResponse";
import Card from "../../entity/Card";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import MyContext from "../../types/MyContext";
import { EDIT_MESSAGE } from '../project/ProjectListener';
import ListenerResponse from "../shared/ListenerResponse";

@Resolver()
export default class EditMessageResolover {

    @UseMiddleware(isAuth, isMessageAccessible, checkIfTeamAdmin)
    @Mutation(() => MessageResponse)
    async editMessage(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('data') data: MessageInput,
        @Arg('project_id') project_id: number,
        @Arg('message_id') message_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<MessageResponse> {

        const messageResponse = new MessageResponse();

        await getManager().transaction("REPEATABLE READ", async (transactionalEntityManager) => {
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

            messageResponse.message = result.raw[0] as Message;


            const list: { list_id: number } = await transactionalEntityManager
                .createQueryBuilder()
                .select('t2.list_id', 'list_id')
                .from(Message, 't1')
                .where('t1.message_id= :message_id', { message_id })
                .innerJoin(Card, 't2', 't2.card_id=t1.card_id')
                .getRawOne();

            if (!list) {
                throw Error('List doesnt exist!');
            }

            messageResponse.list_id = list.list_id
        });

        pubsub.publish(EDIT_MESSAGE, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: EDIT_MESSAGE,
            card_id: messageResponse.message.card_id,
            editMessage: messageResponse
        } as ListenerResponse);

        return messageResponse;
    }

}