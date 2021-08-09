import { Field, InputType } from "type-graphql";
import StringLength from '../../../custom_validators/StringLength';
@InputType()
export default class MessageInput {

    @Field()
    @StringLength(1, null, { message: "Content length has to be longer than 1 character!" })
    content: string;

}