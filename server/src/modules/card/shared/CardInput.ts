import { Field, InputType } from "type-graphql";
import { IsDate, MinLength, Length, IsNotEmpty } from 'class-validator';
import StringLength from "../../../custom_validators/StringLength";

@InputType()
export default class CardInput {

    @Field()
    @StringLength(1, 15,{message:"Name length has to be between 1 and 15 characters!"})
    @IsNotEmpty()
    name: string;

    @Field()
    @MinLength(1)
    description: string;

    @Field()
    @IsDate()
    deadline: Date;

}