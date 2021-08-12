import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class MoveCardResponse {

    @Field(() => ID)
    card_id: number

    @Field(() => ID)
    old_list_id: number

    @Field(() => ID)
    list_id: number

    @Field()
    order_index: number

}