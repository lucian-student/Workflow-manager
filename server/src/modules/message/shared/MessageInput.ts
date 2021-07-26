import { Field, InputType } from "type-graphql";

@InputType()
export default class MessageInput {

    @Field()
    content: string;

}