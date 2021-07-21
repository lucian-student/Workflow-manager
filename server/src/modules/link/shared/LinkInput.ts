import { Field, InputType } from "type-graphql";
import { IsNotEmpty, Length } from 'class-validator'
import StringLength from "../../../custom_validators/StringLength";

@InputType()
export default class LinkInput {

    @Field()
    @StringLength(1, 15,{message:"Name length has to be between 1 and 15 characters!"})
    @IsNotEmpty()
    name: string;

    @Field()
    // @IsUrl()
    url: string;
}