import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import isAuth from '../../middleware/isAuth';
import getTeamRole from '../../middleware/getTeamRole';
import Team from '../../entity/Team';

@Resolver()
export default class LastActiveTeamResolver {

    @UseMiddleware(isAuth, getTeamRole)
    @Mutation(() => Boolean)
    async lastActiveTeam(
        @Arg('team_id') team_id: number
    ): Promise<boolean> {

        await Team.update({ team_id }, { last_active: () => 'current_timestamp' });

        return true;
    }

}