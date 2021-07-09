import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Card from "../../entity/Card";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import CreateCardInput from "./createCard/CreateCardInput";
import { getManager } from "typeorm";
import Todo from "../../entity/Todo";
import Link from "../../entity/Link";

@Resolver()
export default class CreateCardResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin)
    @Mutation(() => Card)
    async createCard(
        @Arg('data') data: CreateCardInput,
        @Arg('project_id') project_id: number,
        @Arg('list_id') list_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<Card> {
        const { name, deadline, description, todos, links } = data;

        let card = new Card();

        await getManager().transaction('SERIALIZABLE', async (transactionalEntityManager) => {

            const count = await transactionalEntityManager.
                createQueryBuilder(Card, 't1')
                .where("t1.project_id = :project_id", { project_id })
                .getCount();

            const cardResult = await transactionalEntityManager
                .createQueryBuilder()
                .insert()
                .into(Card)
                .values({
                    name,
                    deadline,
                    description,
                    list_id,
                    project_id,
                    order_index: count
                })
                .returning('*')
                .execute();

            card = cardResult.raw[0] as Card;

            const todoResult = await transactionalEntityManager
                .createQueryBuilder()
                .insert()
                .into(Todo)
                .values(
                    [...todos.map(todo => ({
                        project_id,
                        card_id: card.card_id,
                        name: todo.name,
                        description: todo.description
                    }))])
                .returning('*')
                .execute();

            if (!todoResult.raw) {
                card.todos = [];
            } else {
                card.todos = todoResult.raw as Todo[];
            }

            const linkResult = await transactionalEntityManager
                .createQueryBuilder()
                .insert()
                .into(Link)
                .values(
                    [...links.map(link => ({
                        project_id,
                        card_id: card.card_id,
                        ...link
                    }))])
                .returning('*')
                .execute();

            if (!linkResult.raw) {
                card.links = [];
            } else {
                card.links = linkResult.raw as Link[];
            }
        });

        return card;
    }

}