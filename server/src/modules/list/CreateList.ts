import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import Project from "../../entity/Project";
import List from "../../entity/List";
import { getManager } from "typeorm";
import ListInput from "./shared/ListInput";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";


@Resolver()
export default class CreateListResolver {

    @UseMiddleware(isAuth, isProjectAccessible, checkIfTeamAdmin)
    @Mutation(() => List)
    async createList(
        @Arg('project_id') project_id: number,
        @Arg('data') { name }: ListInput,
        @Arg('team_id', { nullable: true }) team_id?: number,
    ) {

        let list = new List();

        await getManager().transaction('SERIALIZABLE', async (transactionalEntityManager) => {
            const count = await transactionalEntityManager.
                createQueryBuilder(List, 't1')
                .where("t1.project_id = :project_id", { project_id })
                .getCount();

            list.name = name.trimStart().trimEnd().replace(/\s+/g, " ");
            list.order_index = count;
            list.project = { project_id } as Project;

            list = await transactionalEntityManager.create(List, list).save();
            list.cards = [];
        });

        return list;

    }

}