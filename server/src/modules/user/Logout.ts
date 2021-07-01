import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import MyContext from "../../types/MyContext";
import { sendRefreshToken } from "../../utils/sendRefreshToken";
import isAuth from "../../middleware/isAuth";
@Resolver()
export default class LogoutResolver {

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    logout(
        @Ctx() ctx: MyContext
    ): boolean {

        sendRefreshToken(ctx.res, "");

        return true;
    }
}