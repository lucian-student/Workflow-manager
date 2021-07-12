import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import Team from "../../entity/Team";
import MyContext from "../../types/MyContext";

@Resolver()
export default class CreateTeamResolver {

    @UseMiddleware(isAuth)
    @Mutation(() => Team)
    async createTeam(
        @Ctx() ctx: MyContext
    ): Promise<Team> {
        

        return new Team();
    }

}