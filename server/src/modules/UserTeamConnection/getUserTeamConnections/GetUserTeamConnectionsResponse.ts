import { ID, Field, ObjectType } from 'type-graphql';
import UserTeamConnection from '../../../entity/UserTeamConnection';

@ObjectType()
export default class GetUserTeamConnectionsResponse {

    @Field(() => ID)
    user_id: number

    @Field(() => [UserTeamConnection])
    cons: UserTeamConnection[]

}