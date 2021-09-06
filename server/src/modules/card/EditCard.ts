import { Arg, Ctx, Mutation, PubSub, Resolver, UseMiddleware } from "type-graphql";
import Card from "../../entity/Card";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import CardInput from "./shared/CardInput";
import { getManager } from "typeorm";
import checkIfTeamAdmin from "../../middleware/checkIfTeamAdmin";
import { PubSub as PubSubType } from 'graphql-subscriptions';
import { EDIT_CARD } from '../project/ProjectListener';
import ListenerResponse from "../shared/ListenerResponse";
import MyContext from "../../types/MyContext";

@Resolver()
export default class EditCardResolver {

    @UseMiddleware(isAuth, isCardAccessible, checkIfTeamAdmin)
    @Mutation(() => Card)
    async editCard(
        @PubSub() pubsub: PubSubType,
        @Ctx() ctx: MyContext,
        @Arg('data') data: CardInput,
        @Arg('card_id') card_id: number,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Card> {

        const result = await getManager()
            .createQueryBuilder()
            .update(Card)
            .set({
                ...data,
                name: data.name.trimEnd().trimStart().replace(/\s+/g, " ")
            })
            .where('card_id= :card_id', { card_id })
            .returning('*')
            .execute();

        if (!result.raw) {
            throw Error('Card doesnt exist!');
        }

        const card = result.raw[0] as Card;

        pubsub.publish(EDIT_CARD, {
            project_id,
            user_id: ctx.payload.user_id,
            topic: EDIT_CARD,
            editCard: card,
            card_id
        } as ListenerResponse);

        return card;
    }

}