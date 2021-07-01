import { Query, Resolver } from "type-graphql";

@Resolver()
export default class HelloResolver {

    @Query(() => String)
    hello(): string {
        return 'hello world!'
    }
}