import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Message from "../../entity/Message";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import isAuth from "../../middleware/isAuth";
import isMessageAccessible from "../../middleware/isMessageAccessible";
import { getManager } from 'typeorm';
import DeleteMessageResponse from "./deleteMessage/DeleteMessageResponse";
import Card from "../../entity/Card";

@Resolver()
export default class DeleteMessageResolver {

    @UseMiddleware(isAuth, isMessageAccessible, checkIfTeamAdmin)
    @Mutation(() => DeleteMessageResponse)
    async deleteMessage(
        @Arg('project_id') project_id: number,
        @Arg('message_id') message_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<DeleteMessageResponse> {

        const res = new DeleteMessageResponse();

        await getManager().transaction("REPEATABLE READ", async (transactionalEntityManager) => {

            const list: { list_id: number } = await transactionalEntityManager
                .createQueryBuilder()
                .select('t2.list_id', 'list_id')
                .from(Message, 't1')
                .where('t1.message_id= :message_id', { message_id })
                .innerJoin(Card, 't2', 't2.card_id=t1.card_id')
                .getRawOne();

            if (!list) {
                throw Error('Listsada doesnt exist!');
            }

            res.list_id = list.list_id


            const result = await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(Message)
                .where('message_id= :message_id', { message_id })
                .returning('card_id')
                .execute();


            if (!result.affected) {
                throw Error('Project doesnt exist!');
            }

            if (result.affected === 0) {
                throw Error('Project doesnt exist!');
            }

            res.message_id = message_id;

            res.card_id = result.raw[0].card_id;
        });

        return res;
    }

}