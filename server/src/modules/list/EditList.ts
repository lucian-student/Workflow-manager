import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import List from "../../entity/List";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isListAccessible from "../../middleware/isListAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import MyContext from "../../types/MyContext";
import ListInput from "./shared/ListInput";

@Resolver()
export default class EditListResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin, isProjectAccessible, isListAccessible)
    @Mutation(() => List, { nullable: true })
    async editList(
        @Arg('project_id') project_id: number,
        @Arg('list_id') list_id: number,
        @Arg('data') { name }: ListInput,
        @Ctx() ctx: MyContext,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<List | null> {

        const list = ctx.payload.curr_list;

        if (!list) {
            throw Error('List doesnt exist!');
        }

        list.name = name;

        return await list.save();
    }

}