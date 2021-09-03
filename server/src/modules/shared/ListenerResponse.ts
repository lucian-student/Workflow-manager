import { ObjectType, Field, ID } from 'type-graphql';
import Card from '../../entity/Card';
import Project from "../../entity/Project";
import DeleteCardResponse from '../card/deleteCard/deleteCardResponse';

@ObjectType()
export default class ListenerResponse {

    @Field(() => ID)
    project_id: number;

    user_id: number

    @Field()
    topic: string

    @Field(() => Project, { nullable: true })
    editProject?: Project

    @Field(() => DeleteCardResponse, { nullable: true })
    deleteCard?: DeleteCardResponse

    @Field(() => Card, { nullable: true })
    editCard?: Card
}