import { Field, InputType } from "type-graphql";
import { Length } from 'class-validator';

@InputType()
export default class MessageInput {

    @Field()
    @Length(1, 255)
    content: string;

}