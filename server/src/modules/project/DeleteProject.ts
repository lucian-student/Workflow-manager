import { Ctx, PubSub, Arg, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Project from "../../entity/Project";
import isAuth from "../../middleware/isAuth";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import { getManager } from "typeorm";
import checkIfTeamOwner from "../../middleware/checkIfTeamOwner";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import { DELETE_PROJECT } from './ProjectListener';
import ListenerResponse from "../shared/ListenerResponse";
import MyContext from "../../types/MyContext";

@Resolver()
export default class DeleteProjectResolver {

    @UseMiddleware(isAuth, isProjectAccessible, checkIfTeamOwner)
    @Mutation(() => ID)
    async deleteProject(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<number> {

        const result = await getManager()
            .createQueryBuilder()
            .delete()
            .from(Project)
            .where('project_id= :project_id', { project_id })
            .execute();

        if (!result.affected) {
            throw Error('Project doesnt exist!');
        }

        if (result.affected === 0) {
            throw Error('Project doesnt exist!');
        }

        await pubsub.publish(DELETE_PROJECT, {
            project_id,
            user_id: ctx.payload.user_id,
            editProject: undefined,
            topic: DELETE_PROJECT
        } as ListenerResponse);

        return project_id;
    }

}