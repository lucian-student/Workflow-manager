import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import UserTeamConnection from "../../entity/UserTeamConnection";
import MyContext from "../../types/MyContext";

@Resolver()
export default class GetUserTeamConnectionResolver {

    @UseMiddleware(isAuth)
    @Query(() => UserTeamConnection, { nullable: true })
    async getUserTeamConnection(
        @Ctx() ctx: MyContext,
        @Arg('team_id') team_id?: number
    ): Promise<UserTeamConnection | null> {
        if (!team_id) {
            return null;
        }

        const user_id = ctx.payload.user_id;

        const userCon = await UserTeamConnection.findOne({ where: { team_id, user_id } });

        if (!userCon) {
            throw Error('User team connectiond doesnt exist!');
        }

        return userCon;
    }

}