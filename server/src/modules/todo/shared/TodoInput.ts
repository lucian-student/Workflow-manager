import { IsNotEmpty, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import StringLength from '../../../custom_validators/StringLength';

@InputType()
export default class TodoInput {

    @Field()
    @StringLength(1, null, { message: "Name length has to be 1 or more characters long!" })
    @IsNotEmpty()
    name: string;

}