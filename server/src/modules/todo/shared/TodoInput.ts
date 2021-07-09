import { Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export default class TodoInput{

    @Field()
    @Length(1,15)
    name:string;

    @Field()
    @MinLength(1)
    description:string;

}