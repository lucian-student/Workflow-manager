import { Arg, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Message from "../../entity/Message";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isMessageAccessible from "../../middleware/isMessageAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamMember from "../../middleware/isTeamMember";

@Resolver()
export default class DeleteMessageResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamMember, isProjectAccessible, isMessageAccessible)
    @Mutation(() => ID)
    async deleteMessage(
        @Arg('project_id') project_id: number,
        @Arg('message_id') message_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<number> {
        const result = await Message.delete({ message_id });

        if (!result.affected) {
            throw Error('Project doesnt exist!');
        }

        if (result.affected === 0) {
            throw Error('Project doesnt exist!');
        }

        return message_id;
    }

}