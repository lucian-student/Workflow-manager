import { Field, ObjectType } from "type-graphql";
import User from "../../../entity/User";
@ObjectType()
export default class LoginResponse {

    @Field(() => User)
    user: User;

    @Field()
    access_token: string;
}