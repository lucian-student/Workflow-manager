import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import Team from '../../entity/Team';
import getTeamRole from '../../middleware/getTeamRole';
import isAuth from '../../middleware/isAuth';
import { getManager } from 'typeorm';
import User from '../../entity/User';
import UserTeamConnection from '../../entity/UserTeamConnection';

interface Data {
    con_id: string,
    confirmed: boolean,
    role: number,
    user_id: string,
    username: string,
    team_id: string,
    name: string,
    description: string,
    last_active: Date
}

@Resolver()
export default class GetTeamsResolver {

    @UseMiddleware(isAuth, getTeamRole)
    @Query(() => Team, { nullable: true })
    async getTeam(
        @Arg('team_id') team_id: number
    ) {
        const data: Data[] = await getManager()
            .createQueryBuilder()
            .select('t1.*')
            .addSelect('t3.username', 'username')
            .addSelect('t2.confirmed', 'confirmed')
            .addSelect('t2.con_id', 'con_id')
            .addSelect('t2.role', 'role')
            .addSelect('t2.user_id', 'user_id')
            .from(Team, 't1')
            .where('t1.team_id= :team_id', { team_id })
            .andWhere('t2.confirmed=true')
            .leftJoin(UserTeamConnection, 't2', 't1.team_id=t2.team_id')
            .innerJoin(User, 't3', 't3.user_id=t2.user_id')
            .orderBy('t2.role','DESC')
            .getRawMany();


        const cons: UserTeamConnection[] = [];
        const team = new Team();

        data.forEach((item, index) => {
            if (index === 0) {
                team.team_id = Number(item.team_id);
                team.name = item.name;
                team.description = item.description;
                team.last_active = item.last_active;
            }

            const newCon = new UserTeamConnection();

            newCon.con_id = Number(item.con_id);
            newCon.confirmed = item.confirmed;
            newCon.role = item.role;
            newCon.user_id = Number(item.user_id);
            newCon.team_id = Number(item.team_id);
            newCon.username = item.username;

            cons.push(newCon);
        });

        team.cons = cons;

        return team;
    }

}