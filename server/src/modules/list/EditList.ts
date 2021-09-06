import { PubSub, Ctx, Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import List from "../../entity/List";
import isAuth from "../../middleware/isAuth";
import isListAccessible from "../../middleware/isListAccessible";
import ListInput from "./shared/ListInput";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import MyContext from "../../types/MyContext";
import ListenerResponse from "../shared/ListenerResponse";
import { EDIT_LIST } from '../project/ProjectListener';

@Resolver()
export default class EditListResolver {

    @UseMiddleware(isAuth, isListAccessible, checkIfTeamAdmin)
    @Mutation(() => List)
    async editList(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('project_id') project_id: number,
        @Arg('list_id') list_id: number,
        @Arg('data') { name }: ListInput,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<List> {

        const result = await getManager()
            .createQueryBuilder()
            .update(List)
            .set({
                name: name.trimEnd().trimStart().replace(/\s+/g, " ")
            })
            .where('list_id= :list_id', { list_id })
            .returning('*')
            .execute();
        if (!result.raw) {
            throw Error('Message doesnt exist!');
        }

        const list = result.raw[0] as List;

        pubsub.publish(EDIT_LIST, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: EDIT_LIST,
            editList: list
        } as ListenerResponse);

        return list;
    }

}