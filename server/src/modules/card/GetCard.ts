import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { getManager } from "typeorm";
import Card from "../../entity/Card";
import Todo from "../../entity/Todo";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamMember from "../../middleware/isTeamMember";

@Resolver()
export default class GetCardResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamMember, isProjectAccessible, isCardAccessible)
    @Query(() => Card, { nullable: true })
    async getCard(
        @Arg('project_id') project_id: number,
        @Arg('card_id') card_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<Card | null> {

        const card = await getManager()
            .createQueryBuilder(Card, 't1')
            .where('t1.card_id= :card_id', { card_id })
            .leftJoinAndMapMany('t1.todos', 'todo', 't2', 't2.card_id=t1.card_id')
            .leftJoinAndMapMany('t1.links', 'link', 't3', 't3.card_id=t1.card_id')
            .leftJoinAndMapMany('t1.messages', 'message', 't4', 't4.card_id=t1.card_id')
            .orderBy('t4.data_of_creation', 'DESC')
            .getOne();


        if (!card) {
            return null;
        }

        if (!card.todos) {
            card.todos = [];
        }

        if (!card.links) {
            card.links = [];
        }

        if (!card.messages) {
            card.messages = [];
        }

        return card;
    }

}