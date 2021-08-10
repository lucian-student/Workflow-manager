import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default class DeleteMessageResponse {

    @Field(() => ID)
    list_id: number

    @Field(() => ID)
    message_id: number

    @Field(() => ID)
    card_id: number
}