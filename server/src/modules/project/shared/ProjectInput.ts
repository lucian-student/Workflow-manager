import { InputType, Field } from "type-graphql";
import { IsDate } from 'class-validator';
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
    @StringLength(1, 20, { message: "Name length has to be between 1 and 20 characters!" })
    name: string;

    @Field()
    description: string;

}