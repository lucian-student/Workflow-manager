import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import User from "../../entity/User";
import RegisterInput from "./register/RegisterInput";
import bcrypt from 'bcryptjs';
import { UserInputError } from "apollo-server-core";
import generateRefreshToken from "../../utils/generateRefreshToken";
import generateAccessToken from "../../utils/generateAccessToken";
import MyContext from "../../types/MyContext";
import { sendRefreshToken } from "../../utils/sendRefreshToken";
import RegisterResponse from "./register/RegisterResponse";

@Resolver()
export default class RegisterResolver {

    @Mutation(() => RegisterResponse)
    async register(
        @Arg('data') data: RegisterInput,
        @Ctx() { res }: MyContext
    ): Promise<RegisterResponse> {

        const { username, email, password, confirm_password } = data;

        if (password !== confirm_password) {
            throw new UserInputError('Password doesnt match confirm password!');
        }


        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username: username.trimStart().trimEnd(),
            email: email.trim(),
            password: bcryptPassword
        }).save();

        const refresh_token = generateRefreshToken(user.user_id, user.tokenVersion);
        sendRefreshToken(res, refresh_token);
        const access_token = generateAccessToken(user.user_id);

        return {
            access_token,
            user
        };
    }
}