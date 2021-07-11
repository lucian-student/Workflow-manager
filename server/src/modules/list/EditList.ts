import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import List from "../../entity/List";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isListAccessible from "../../middleware/isListAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import ListInput from "./shared/ListInput";
import { getManager } from "typeorm";

@Resolver()
export default class EditListResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin, isProjectAccessible, isListAccessible)
    @Mutation(() => List)
    async editList(
        @Arg('project_id') project_id: number,
        @Arg('list_id') list_id: number,
        @Arg('data') { name }: ListInput,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<List> {

        const result = await getManager()
        .createQueryBuilder()
        .update(List)
        .set({
            name
        })
        .where('list_id= :list_id', { list_id })
        .returning('*')
        .execute();
    if (!result.raw) {
        throw Error('Message doesnt exist!');
    }

    const list = result.raw[0] as List;

    return list;
    }

}