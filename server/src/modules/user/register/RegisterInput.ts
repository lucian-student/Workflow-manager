import { InputType, Field } from "type-graphql";
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import IsEmailAlreadyUsed from "./IsEmailAlreadyUsed";
import IsUsernameAlreadyUsed from "./IsUsernameAlreadyUsed";
import StringLength from '../../../custom_validators/StringLength';
@InputType()
export default class RegisterInput {

    @IsUsernameAlreadyUsed({ message: "Username is already used!" })
    @Field()
    @StringLength(3, 15,{message:"Username length has to be between 3 and 15 characters!"})
    @IsNotEmpty()
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