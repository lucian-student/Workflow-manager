import { ID, Field, ObjectType } from 'type-graphql';
import UserTeamConnection from '../../../entity/UserTeamConnection';

@ObjectType()
export default class GetTeamInvitationsResponse {

    @Field(() => ID)
    user_id: number

    @Field(() => [UserTeamConnection])
    cons: UserTeamConnection[]

}