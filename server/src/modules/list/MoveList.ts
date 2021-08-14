import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import List from "../../entity/List";
import isAuth from "../../middleware/isAuth";
import isListAccessible from "../../middleware/isListAccessible";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import MoveListResponse from "./moveList/MoveListResponse";
import Project from "../../entity/Project";

@Resolver()
export default class MoveListResolver {

    @UseMiddleware(isAuth, isListAccessible, checkIfTeamAdmin)
    @Mutation(() => MoveListResponse)
    async moveList(
        @Arg('project_id') project_id: number,
        @Arg('list_id') list_id: number,
        @Arg('end_index') end_index: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<MoveListResponse> {


        const res = new MoveListResponse();

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

            const project: { list_count: number } | undefined = await transactionalEntityManager
                .createQueryBuilder()
                .select('count(distinct t2.list_id)', 'list_count')
                .from(Project, 't1')
                .leftJoin(List, 't2', 't1.project_id=t2.project_id')
                .groupBy('t1.project_id')
                .where('t1.project_id= :project_id', { project_id })
                .getRawOne();


            if (!project) {
                throw new Error('Access denied! You dont have permission to perform this action!');
            }


            let finish_index = end_index;



            if (project.list_count < finish_index) {
                finish_index = project.list_count;
            }

            if (0 > finish_index) {
                finish_index = 0;
            }

            await transactionalEntityManager.update(List, { list_id }, { order_index: finish_index });

            res.order_index = finish_index;
            res.list_id = list_id;
        });

        return res;
    }

}