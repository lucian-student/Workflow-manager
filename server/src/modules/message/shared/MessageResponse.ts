import { ObjectType, Field, ID } from 'type-graphql';
import Message from '../../../entity/Message';

@ObjectType()
export default class MessageResponse {

    @Field(() => ID)
    list_id: number

    @Field(() => Message)
    message: Message
}