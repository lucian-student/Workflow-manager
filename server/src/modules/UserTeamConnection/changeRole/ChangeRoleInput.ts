import { Field, InputType } from 'type-graphql';
import IsRoleValid from '../../../custom_validators/IsRoleValid';

@InputType()
export default class ChangeRoleInput {

    @IsRoleValid({ message: 'Role isnt valid!' })
    @Field()
    role: number

}