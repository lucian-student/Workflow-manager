import { InputType, Field } from "type-graphql";
import { IsEmail, Length, MinLength } from 'class-validator';
import IsEmailAlreadyUsed from "./IsEmailAlreadyUsed";
import IsUsernameAlreadyUsed from "./IsUsernameAlreadyUsed";
@InputType()
export default class RegisterInput {

    @IsUsernameAlreadyUsed({ message: "Username is already used!" })
    @Field()
    @Length(3, 15)
    username: string;

    @IsEmailAlreadyUsed({ message: "Email is already used!" })
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(3)
    password: string;

    @Field()
    @MinLength(3)
    confirm_password: string;
}