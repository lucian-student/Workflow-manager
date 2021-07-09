import { Field, InputType } from "type-graphql";
import { IsDate, MinLength, Length } from 'class-validator';


@InputType()
export default class CardInput {

    @Field()
    @Length(1, 15)
    name: string;

    @Field()
    @MinLength(1)
    description: string;

    @Field()
    @IsDate()
    deadline: Date;

}