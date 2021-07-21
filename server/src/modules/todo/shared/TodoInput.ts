import { IsNotEmpty, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import StringLength from '../../../custom_validators/StringLength';

@InputType()
export default class TodoInput {

    @Field()
    @StringLength(1, 15, { message: "Name length has to be between 1 and 15 characters!" })
    @IsNotEmpty()
    name: string;

    @Field()
    @MinLength(1)
    description: string;

}