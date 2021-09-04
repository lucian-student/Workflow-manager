import { ObjectType, Field, ID } from 'type-graphql';
import Card from '../../entity/Card';
import Project from "../../entity/Project";
import DeleteCardResponse from '../card/deleteCard/deleteCardResponse';
import MoveCardResponse from '../card/moveCard/MoveCardResponse';
import LinkResponse from '../link/shared/LinkResponse';

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

    @Field(() => MoveCardResponse, { nullable: true })
    moveCard?: MoveCardResponse

    @Field(() => Card, { nullable: true })
    createCard?: Card

    @Field(() => LinkResponse, { nullable: true })
    createLink?: LinkResponse
    
}