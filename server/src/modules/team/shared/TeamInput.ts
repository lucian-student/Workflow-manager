import { InputType, Field } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export default class TeamInput {

    @Field()
    @IsNotEmpty()
    name: string;

    @Field()
    description: string;

}