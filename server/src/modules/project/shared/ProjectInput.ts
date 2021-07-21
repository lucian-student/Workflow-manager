import { InputType, Field } from "type-graphql";
import { IsDate, MaxLength, MinLength } from 'class-validator';
import StringLength from "../../../custom_validators/StringLength";
@InputType()
export default class ProjectInput {

    @Field()
    @StringLength(1, 20, { message: "Name length has to be between 1 and 20 characters!" })
    status: string;

    @Field()
    @IsDate()
    deadline: Date

    @Field()
    @MinLength(1)
    @MaxLength(20)
    name: string;

    @Field()
    @MinLength(1)
    description: string;

}