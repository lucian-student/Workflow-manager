import { Arg, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Card from "../../entity/Card";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";

interface RawItem {
    order_index: number,
    list_id:number
}

@Resolver()
export default class DeleteCardResolver {

    @UseMiddleware(isAuth, isCardAccessible,checkIfTeamAdmin)
    @Mutation(() => ID)
    async deleteCard(
        @Arg('card_id') card_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<number> {

        await getManager().transaction("SERIALIZABLE", async (transactionalEntityManager) => {
            const result = await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(Card)
                .where('card_id = :card_id', { card_id })
                .returning(['order_index', 'list_id'])
                .execute();

            console.log(result);

            if (!result.affected) {
                throw Error('Card doesnt exist!');
            }

            if (result.affected === 0) {
                throw Error('Card doesnt exist!');
            }
            const rawRes: RawItem = result.raw[0];
            const order_index = rawRes.order_index;
            const list_id = rawRes.list_id;
            await transactionalEntityManager
                .createQueryBuilder()
                .update(Card)
                .set({ order_index: () => 'order_index-1' })
                .where('order_index >:order_index', { order_index })
                .andWhere('list_id= :list_id', { list_id })
                .execute();
        });

        return card_id;
    }

}