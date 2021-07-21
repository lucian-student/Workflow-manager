import { ID, Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import List from "../../entity/List";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isLinkAccessible from "../../middleware/isLinkAccessible";

interface RawItem {
    order_index: number
}

@Resolver()
export default class DeleteListResolver {

    @UseMiddleware(isAuth, isLinkAccessible, checkIfTeamAdmin)
    @Mutation(() => ID)
    async deleteList(
        @Arg('project_id') project_id: number,
        @Arg('list_id') list_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<number> {

        await getManager().transaction("SERIALIZABLE", async (transactionalEntityManager) => {
            const result = await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(List)
                .where('list_id = :list_id', { list_id })
                .returning(['order_index'])
                .execute();

            console.log(result);

            if (!result.affected) {
                throw Error('List doesnt exist!');
            }

            if (result.affected === 0) {
                throw Error('List doesnt exist!');
            }
            const rawRes: RawItem = result.raw[0];
            const order_index = rawRes.order_index;

            await transactionalEntityManager
                .createQueryBuilder()
                .update(List)
                .set({ order_index: () => 'order_index-1' })
                .where('order_index >:order_index', { order_index })
                .andWhere('project_id= :project_id', { project_id })
                .execute();
        });

        return list_id;
    }

}