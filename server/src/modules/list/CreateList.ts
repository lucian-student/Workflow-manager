import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import Project from "../../entity/Project";
import List from "../../entity/List";
import { getManager } from "typeorm";
import ListInput from "./shared/ListInput";

@Resolver()
export default class CreateListResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin, isProjectAccessible)
    @Mutation(() => List)
    async createList(
        @Arg('project_id') project_id: number,
        @Arg('data') { name }: ListInput,
        @Arg('team_id', { nullable: true }) team_id?: number,
    ) {
        const list = new List();

        const count = await getManager().
            createQueryBuilder(List, 't1')
            .where("t1.project_id = :project_id", { project_id })
            .getCount();

        list.name = name;
        list.order_index = count;
        list.project = { project_id } as Project;

        return await list.save();
    }

}