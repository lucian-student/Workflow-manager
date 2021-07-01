import User from "../../entity/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { sendRefreshToken } from "../../utils/sendRefreshToken";
import MyContext from "../../types/MyContext";
import bcrypt from 'bcryptjs';
import generateAccessToken from "../../utils/generateAccessToken";
import generateRefreshToken from "../../utils/generateRefreshToken";
import LoginResponse from "./login/LoginResponse";



@Resolver()
export default class LoginResolver {

    @Mutation(() => LoginResponse, { nullable: true })
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse | null> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return null;
        }

        if (!await bcrypt.compare(password, user.password)) {
            return null;
        }

        const refresh_token = generateRefreshToken(user.user_id, user.tokenVersion);
        sendRefreshToken(res, refresh_token);
        const access_token = generateAccessToken(user.user_id);

        return {
            access_token,
            user
        };
    }
}