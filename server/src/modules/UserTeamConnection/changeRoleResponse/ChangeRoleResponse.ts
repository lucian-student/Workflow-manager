import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default class ChangeRoleResponse {

    @Field(() => ID)
    con_id: number

    @Field()
    role: number

}