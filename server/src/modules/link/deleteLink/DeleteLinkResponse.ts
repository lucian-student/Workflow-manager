import { ID, ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class DeleteLinkResponse {

    @Field(() => ID)
    list_id: number

    @Field(() => ID)
    link_id: number
}