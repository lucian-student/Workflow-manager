import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import User from "../../entity/User";
import isAuth from "../../middleware/isAuth";
import MyContext from "../../types/MyContext";
@Resolver()
export default class MeResolver {

    @UseMiddleware(isAuth)
    @Query(() => User, { nullable: true })
    async me(
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const user_id = ctx.payload.user_id;

        const user = await User.findOne({ where: { user_id } });

        if (!user) {
            return null;
        }

        return user;
    }

}