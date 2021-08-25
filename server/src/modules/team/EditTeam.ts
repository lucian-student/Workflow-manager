import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import checkIfTeamAdmin from '../../middleware/checkIfTeamAdmin';
import getTeamRole from '../../middleware/getTeamRole';
import isAuth from '../../middleware/isAuth';
import Team from '../../entity/Team';
import ProjectInput from '../project/shared/ProjectInput';
import { getManager } from 'typeorm';
import TeamInput from './shared/TeamInput';

@Resolver()
export default class EditTeamResolver {

    @UseMiddleware(isAuth, getTeamRole, checkIfTeamAdmin)
    @Mutation(() => Team)
    async editTeam(
        @Arg('team_id') team_id: number,
        @Arg('data') data: TeamInput
    ): Promise<Team> {

        const result = await getManager()
            .createQueryBuilder()
            .update(Team)
            .set({
                description: data.description,
                name: data.name.trimStart().trimEnd().replace(/\s+/g, " ")
            })
            .where('team_id= :team_id', { team_id })
            .returning('*')
            .execute();

        if (!result.raw) {
            throw Error('Message doesnt exist!');
        }

        const team = result.raw[0] as Team;

        return team;
    }

}