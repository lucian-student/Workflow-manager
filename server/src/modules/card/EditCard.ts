import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Card from "../../entity/Card";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import CardInput from "./shared/CardInput";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";

@Resolver()
export default class EditCardResolver {

    @UseMiddleware(isAuth, isCardAccessible,checkIfTeamAdmin)
    @Mutation(() => Card)
    async editCard(
        @Arg('data') data: CardInput,
        @Arg('card_id') card_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<Card> {

        const result = await getManager()
            .createQueryBuilder()
            .update(Card)
            .set({
                ...data,
                name:data.name.trimEnd().trimStart().replace(/\s+/g, " ")
            })
            .where('card_id= :card_id', { card_id })
            .returning('*')
            .execute();
        if (!result.raw) {
           throw Error('Card doesnt exist!');
        }

        const card = result.raw[0] as Card;

        return card;
    }

}