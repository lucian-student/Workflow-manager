import { InputType, Field } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import StringLength from '../../../custom_validators/StringLength';

@InputType()
export default class TeamInput {

    @Field()
    @StringLength(3, 15, { message: "Name length has to be between 3 and 15 characters!" })
    @IsNotEmpty()
    name: string;

    @Field()
    description: string;

}