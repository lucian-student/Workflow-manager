import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import MyContext from "../../types/MyContext";
import { getManager } from "typeorm";
import Team from "../../entity/Team";

@Resolver()
export default class DeleteTeamResolver {

    @UseMiddleware(isAuth)
    @Mutation(() => ID)
    async deleteTeam(
        @Arg('team_id') team_id: number,
        @Ctx() ctx: MyContext
    ): Promise<number> {

        const result = await getManager()
            .createQueryBuilder()
            .delete()
            .from(Team)
            .where('team_id= :team_id', { team_id })
            .execute();

        if (!result.affected) {
            throw Error('Project doesnt exist!');
        }

        if (result.affected === 0) {
            throw Error('Project doesnt exist!');
        }

        return team_id;
    }

}