import { Subscription, Resolver, Arg, Root } from 'type-graphql';
import {
    DELETE_CARD,
    EDIT_CARD,
    MOVE_CARD,
    CREATE_LINK,
    EDIT_LINK,
    DELETE_LINK,
    DELETE_LIST,
    CREATE_MESSAGE,
    DELETE_MESSAGE,
    EDIT_MESSAGE,
    CREATE_TODO,
    DELETE_TODO,
    EDIT_TODO,
    DONE_TODO,
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
        topics: [
            DELETE_CARD,
            EDIT_CARD,
            MOVE_CARD,
            CREATE_LINK,
            EDIT_LINK,
            DELETE_LINK,
            DELETE_LIST,
            CREATE_MESSAGE,
            EDIT_MESSAGE,
            DELETE_MESSAGE,
            CREATE_TODO,
            DELETE_TODO,
            EDIT_TODO,
            DONE_TODO
        ],
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

        return data;
    }


}