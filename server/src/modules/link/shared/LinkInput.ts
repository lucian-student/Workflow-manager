import { Field, InputType } from "type-graphql";
import { Length } from 'class-validator'

@InputType()
export default class LinkInput {

    @Field()
    @Length(1, 15)
    name: string;

    @Field()
    // @IsUrl()
    url: string;
}