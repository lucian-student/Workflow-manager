import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Card from "../../entity/Card";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import CardInput from "./shared/CardInput";
import { getManager } from "typeorm";

@Resolver()
export default class EditCardResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin, isProjectAccessible, isCardAccessible)
    @Mutation(() => Card, { nullable: true })
    async editCard(
        @Arg('data') data: CardInput,
        @Arg('card_id') card_id: number,
        @Arg('list_id') list_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<Card | null> {

        const result = await getManager()
            .createQueryBuilder()
            .update(Card)
            .set({
                ...data
            })
            .where('card_id= :card_id', { card_id })
            .returning('*')
            .execute();
        if (!result.raw) {
            return null;
        }

        const card = result.raw[0] as Card;

        return card;
    }

}