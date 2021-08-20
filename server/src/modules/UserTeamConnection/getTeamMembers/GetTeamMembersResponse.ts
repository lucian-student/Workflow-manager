import { ID, Field, ObjectType } from 'type-graphql';
import UserTeamConnection from '../../../entity/UserTeamConnection';

@ObjectType()
export default class GetTeamMembersResponse{

    @Field(() => ID)
    team_id: number

    @Field(() => [UserTeamConnection])
    cons: UserTeamConnection[]
}