import { Field, InputType } from 'type-graphql';
import IsRoleValid from '../../../custom_validators/IsRoleValid';

@InputType()
export default class UserTeamConnectionInput {

    @Field()
    username: string;

    @IsRoleValid({ message: 'Role isnt valid!' })
    @Field()
    role: number;

}