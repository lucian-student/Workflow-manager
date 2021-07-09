import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import List from "../../entity/List";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isListAccessible from "../../middleware/isListAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import { getManager } from "typeorm";

@Resolver()
export default class MoveListResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin, isProjectAccessible, isListAccessible)
    @Mutation(() => Boolean)
    async moveList(
        @Arg('project_id') project_id: number,
        @Arg('list_id') list_id: number,
        @Arg('end_index') end_index: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ) {

        await getManager().transaction("SERIALIZABLE", async (transactionalEntityManager) => {
            const list = await transactionalEntityManager.findOne(List, { where: { list_id } });

            if (!list) {
                throw Error('List doesnt exist!');
            }

            const order_index = list.order_index;

            if (order_index > end_index) {
                await transactionalEntityManager
                    .createQueryBuilder()
                    .update(List)
                    .set({ order_index: () => 'order_index+1' })
                    .where('project_id= :project_id', { project_id })
                    .andWhere('order_index >=:end_index', { end_index })
                    .andWhere('order_index <=:order_index', { order_index })
                    .execute();
            } else if (order_index < end_index) {
                await transactionalEntityManager
                    .createQueryBuilder()
                    .update(List)
                    .set({ order_index: () => 'order_index-1' })
                    .where('project_id= :project_id', { project_id })
                    .andWhere('order_index >=:order_index', { order_index })
                    .andWhere('order_index <=:end_index', { end_index })
                    .execute();
            }

            await transactionalEntityManager.update(List, { list_id }, { order_index: end_index });
        });

        return true;
    }

}