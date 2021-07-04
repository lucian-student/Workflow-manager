import { Query, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
@Resolver()
export default class HelloResolver {

    @UseMiddleware(isAuth)
    @Query(() => String)
    hello(): string {
        return 'hello world!'
    }
}