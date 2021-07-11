import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Card from "../../entity/Card";
import Message from "../../entity/Message";
import Project from "../../entity/Project";
import User from "../../entity/User";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamMember from "../../middleware/isTeamMember";
import MyContext from "../../types/MyContext";
import MessageInput from "./shared/MessageInput";

@Resolver()
export default class CreateMessageResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamMember, isProjectAccessible, isCardAccessible)
    @Mutation(() => Message)
    async createMessage(
        @Arg('data') data: MessageInput,
        @Arg('project_id') project_id: number,
        @Arg('card_id') card_id: number,
        @Ctx() ctx: MyContext,
        @Arg('team_id', { nullable: true }) team_id?: number
    ) {
        const { content } = data;
        const user_id = ctx.payload.user_id;

        const message = new Message();
        message.content = content;
        message.card = { card_id } as Card;
        message.project = { project_id } as Project;
        message.user = { user_id } as User;

        return await message.save();
    }

}