import { ID, ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class DeleteTodoResponse {

    @Field(() => ID)
    todo_id: number

    @Field(() => ID)
    list_id: number
}