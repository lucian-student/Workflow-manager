import { ID, Field, ObjectType } from 'type-graphql';
import Team from '../../../entity/Team';


@ObjectType()
export default class GetTeamsResponse {

    @Field(() => [Team])
    teams: Team[]

    @Field(() => ID)
    user_id: number
}