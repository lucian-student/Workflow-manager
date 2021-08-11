import { Field, ID, ObjectType } from 'type-graphql';


@ObjectType()
export default class DeleteCardResponse {

    @Field(() => ID)
    list_id: number

    @Field(() => ID)
    card_id: number

}