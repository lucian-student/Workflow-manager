import { Field, InputType } from "type-graphql";
import { IsDate, MinLength, Length, IsNotEmpty } from 'class-validator';
import StringLength from "../../../custom_validators/StringLength";

@InputType()
export default class CardInput {

    @Field()
    @StringLength(1, 20,{message:"Name length has to be between 1 and 20 characters!"})
    @IsNotEmpty()
    name: string;

    @Field()
    description: string;

    @Field()
    @IsDate()
    deadline: Date;

}