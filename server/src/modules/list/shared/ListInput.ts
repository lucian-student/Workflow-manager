import { MinLength, isNotEmpty, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";
import StringLength from "../../../custom_validators/StringLength";
@InputType()
export default class ListInput {

    @StringLength(1, null, { message: "Name length has to be longer than 1 character!" })
    @IsNotEmpty()
    @Field()
    name: string

}