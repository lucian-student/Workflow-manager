import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import Team from "../../entity/Team";
import MyContext from "../../types/MyContext";
import TeamInput from "./shared/TeamInput";
import { getManager } from "typeorm";
import UserTeamConnection from "../../entity/UserTeamConnection";
import User from "../../entity/User";

@Resolver()
export default class CreateTeamResolver {

    @UseMiddleware(isAuth)
    @Mutation(() => Team)
    async createTeam(
        @Ctx() ctx: MyContext,
        @Arg('data') data: TeamInput
    ): Promise<Team> {

        const user_id = ctx.payload.user_id;

        const { name, description } = data;

        let team = new Team();
        await getManager().transaction('READ COMMITTED', async (transactionalEntityManager) => {

            team.name = name.trimEnd().trimStart().replace(/\s+/g, " ");
            team.description = description;

            team = await transactionalEntityManager.create(Team, team).save();

            let userCon = new UserTeamConnection();
            userCon.role = 1;
            userCon.confirmed = true;
            userCon.user = { user_id } as User;
            userCon.team = { team_id: team.team_id } as Team;

            userCon = await transactionalEntityManager.create(UserTeamConnection, userCon).save();

            team.cons = [userCon];
        });

        return team;
    }

}