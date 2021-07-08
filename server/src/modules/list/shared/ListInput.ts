import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export default class ListInput {

    @MinLength(1)
    @Field()
    name: string

}