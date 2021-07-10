import { Arg, Mutation, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import Card from "../../entity/Card";
@Resolver()
export default class MoveCard {

    @Mutation(() => Boolean)
    async moveCard(
        @Arg('end_index') end_index: number,
        @Arg('project_id') project_id: number,
        @Arg('card_id') card_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<boolean> {

        await getManager().transaction("SERIALIZABLE", async (transactionalEntityManager) => {
            const card = await transactionalEntityManager.findOne(Card, { where: { card_id } });

            if (!card) {
                throw Error('Card doesnt exist!');
            }

            const order_index = card.order_index;

            if (order_index > end_index) {
                await transactionalEntityManager
                    .createQueryBuilder()
                    .update(Card)
                    .set({ order_index: () => 'order_index+1' })
                    .where('list_id= :list_id', { list_id:card.list_id })
                    .andWhere('order_index >=:end_index', { end_index })
                    .andWhere('order_index <=:order_index', { order_index })
                    .execute();
            } else if (order_index < end_index) {
                await transactionalEntityManager
                    .createQueryBuilder()
                    .update(Card)
                    .set({ order_index: () => 'order_index-1' })
                    .where('list_id= :list_id', { list_id:card.list_id })
                    .andWhere('order_index >=:order_index', { order_index })
                    .andWhere('order_index <=:end_index', { end_index })
                    .execute();
            }

            await transactionalEntityManager.update(Card, { card_id }, { order_index: end_index });
        });

        return true;
    }

}