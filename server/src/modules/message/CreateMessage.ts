import { PubSub, Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Card from "../../entity/Card";
import Message from "../../entity/Message";
import Project from "../../entity/Project";
import User from "../../entity/User";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import MyContext from "../../types/MyContext";
import MessageInput from "./shared/MessageInput";
import MessageResponse from './shared/MessageResponse';
import { getManager } from 'typeorm';
import { PubSub as PubSubType } from 'graphql-subscriptions';
import ListenerResponse from "../shared/ListenerResponse";
import { CREATE_MESSAGE } from '../project/ProjectListener';

@Resolver()
export default class CreateMessageResolver {

    @UseMiddleware(isAuth, isCardAccessible, checkIfTeamAdmin)
    @Mutation(() => MessageResponse)
    async createMessage(
        @PubSub() pubsub: PubSubType,
        @Arg('data') data: MessageInput,
        @Arg('project_id') project_id: number,
        @Arg('card_id') card_id: number,
        @Ctx() ctx: MyContext,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<MessageResponse> {
        const { content } = data;
        const user_id = ctx.payload.user_id;

        let message = new Message();
        message.content = content;
        message.card = { card_id } as Card;
        message.project = { project_id } as Project;
        message.user = { user_id } as User;

        const messageResponse = new MessageResponse();

        await getManager().transaction("REPEATABLE READ", async (transactionalEntityManager) => {
            message = await transactionalEntityManager.save(message);

            messageResponse.message = message;

            const list: { list_id: number } = await transactionalEntityManager
                .createQueryBuilder()
                .select('t1.list_id', 'list_id')
                .from(Card, 't1')
                .where('t1.card_id= :card_id', { card_id })
                .getRawOne();

            if (!list) {
                throw Error('List doesnt exist!');
            }

            messageResponse.list_id = list.list_id;

            const user: { username: string } = await transactionalEntityManager
                .createQueryBuilder()
                .select('t1.username', 'username')
                .from(User, 't1')
                .where('t1.user_id= :user_id', { user_id })
                .getRawOne();

            messageResponse.message.username = user.username;
        });

        pubsub.publish(CREATE_MESSAGE, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: CREATE_MESSAGE,
            card_id,
            createMessage: messageResponse
        } as ListenerResponse);

        return messageResponse;
    }

}