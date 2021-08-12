import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class MoveListResponse {

    @Field()
    order_index: number

    @Field(() => ID)
    list_id: number

}