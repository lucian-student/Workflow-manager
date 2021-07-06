import { InputType, Field } from "type-graphql";
import { IsDate, MaxLength, MinLength } from 'class-validator';

@InputType()
export default class ProjectInput {

    @Field()
    @MinLength(1)
    @MaxLength(20)
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