import { Arg, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import User from "../../entity/User";

@Resolver()
export default class RevokeRefreshTokenResolver {

    @Mutation(() => Boolean)
    async revokeRefreshToken(
        @Arg('user_id') user_id: number
    ): Promise<boolean> {

        await getConnection().getRepository(User).increment({ user_id }, 'tokenVersion', 1);

        return true;
    }

}