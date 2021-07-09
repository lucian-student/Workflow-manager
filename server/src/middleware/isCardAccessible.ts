import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import Card from '../entity/Card';

interface Arguments {
    team_id: number,
    project_id: number
    card_id: number,
    list_id: number
}
const isCardAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {

    const { project_id, card_id, list_id } = args as Arguments;

    const card = await Card.findOne({ where: { card_id } });

    if (!card) {
        //either project doesnt exist or 
        throw new Error('Card doesnt exist!');
    }

    if (Number(card.project_id) !== project_id) {
        throw new Error('Access denied! You dont have permission to perform this action!');
    }

    if (Number(card.list_id) !== list_id) {
        throw new Error('Access denied! You dont have permission to perform this action!');
    }

    context.payload.curr_card = card;

    return next();
}

export default isCardAccessible;