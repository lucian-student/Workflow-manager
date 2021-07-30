import { ID, ObjectType, Field } from 'type-graphql';
import Todo from '../../../entity/Todo';

@ObjectType()
export default class TodoResponse {

    @Field(() => Todo)
    todo: Todo

    @Field(() => ID)
    list_id: number

}