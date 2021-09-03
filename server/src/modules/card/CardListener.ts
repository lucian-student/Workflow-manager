import { Subscription, Resolver, Arg, Root } from 'type-graphql';
import {
    DELETE_CARD,
    EDIT_CARD,
    MOVE_CARD,
    CREATE_CARD,
    Context
} from '../project/ProjectListener';
import ListenerResponse from '../shared/ListenerResponse';
import cardListenerFilter from './cardListener/cardListenerFilter';

export interface Arguments {
    team_id: number,
    project_id: number,
    card_id: number
}

@Resolver()
export default class CardListener {

    @Subscription(() => ListenerResponse, {
        topics: [DELETE_CARD, EDIT_CARD, MOVE_CARD, CREATE_CARD],
        filter: async (filterData: { args: Arguments, context: Context, payload: ListenerResponse }) => {
            console.log(filterData.payload.topic)
            return await cardListenerFilter(filterData);
        }
    })
    cardListener(
        @Arg('card_id') card_id: number,
        @Arg('team_id') team_id: number,
        @Arg('project_id') project_id: number,
        @Root() data: ListenerResponse
    ): ListenerResponse {
        console.log(data);

        return data;
    }


}