import { ObjectType, Field, ID } from 'type-graphql';
import Link from '../../../entity/Link';

@ObjectType()
export default class LinkResponse {

    @Field(() => ID)
    list_id: number

    @Field(() => Link)
    link: Link
}