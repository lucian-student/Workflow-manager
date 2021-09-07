import { ObjectType, Field, ID } from 'type-graphql';
import Card from '../../entity/Card';
import List from '../../entity/List';
import Project from "../../entity/Project";
import DeleteCardResponse from '../card/deleteCard/deleteCardResponse';
import MoveCardResponse from '../card/moveCard/MoveCardResponse';
import DeleteLinkResponse from '../link/deleteLink/DeleteLinkResponse';
import LinkResponse from '../link/shared/LinkResponse';
import MoveListResponse from '../list/moveList/MoveListResponse';
import DeleteMessageResponse from '../message/deleteMessage/DeleteMessageResponse';
import MessageResponse from '../message/shared/MessageResponse';
import DeleteTodoResponse from '../todo/deleteTodo/DeleteTodoResponse';
import TodoResponse from '../todo/shared/TodoResponse';

@ObjectType()
export default class ListenerResponse {

    @Field(() => ID)
    project_id: number;

    card_id?: number

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

    @Field(() => DeleteLinkResponse, { nullable: true })
    deleteLink?: DeleteCardResponse

    @Field(() => LinkResponse, { nullable: true })
    editLink?: LinkResponse

    @Field(() => List, { nullable: true })
    createList?: List

    @Field(() => ID, { nullable: true })
    deleteList?: number

    @Field(() => MoveListResponse, { nullable: true })
    moveList?: MoveListResponse

    @Field(() => List, { nullable: true })
    editList?: List

    @Field(() => MessageResponse, { nullable: true })
    createMessage?: MessageResponse

    @Field(() => DeleteMessageResponse, { nullable: true })
    deleteMessage?: DeleteMessageResponse

    @Field(() => MessageResponse, { nullable: true })
    editMessage?: MessageResponse

    @Field(() => TodoResponse, { nullable: true })
    createTodo?: TodoResponse

    @Field(() => DeleteTodoResponse, { nullable: true })
    deleteTodo?: DeleteTodoResponse

    @Field(() => TodoResponse, { nullable: true })
    editTodo?: TodoResponse

    @Field(() => TodoResponse, { nullable: true })
    doneTodo?: TodoResponse
}