import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { getManager } from "typeorm";
import Card from "../../entity/Card";
import Todo from "../../entity/Todo";
import Message from "../../entity/Message";
import User from "../../entity/User";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isCardAccessible from "../../middleware/isCardAccessible";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamMember from "../../middleware/isTeamMember";
import Link from "../../entity/Link";
import { deserialize } from "v8";

interface resItem {
    t2_todo_id?: number,
    t2_name: string,
    //t2_description: string,
    t2_done: boolean,
    t2_card_id: number,
    t2_project_id: number,
    t3_link_id?: number,
    t3_name: string,
    t3_url: string,
    t3_card_id: number,
    t3_project_id: number,
    t4_message_id?: number,
    t4_content: string,
    t4_user_id: number,
    t4_card_id: number,
    t4_project_id: number,
    t4_data_of_creation: Date,
    t4_username: string,
    card_id: number,
    name: string,
    description: string,
    order_index: number,
    deadline: Date,
    list_id: number,
    project_id: number
}

@Resolver()
export default class GetCardResolver {

    @UseMiddleware(isAuth, isCardAccessible)
    @Query(() => Card, { nullable: true })
    async getCard(
        @Arg('project_id') project_id: number,
        @Arg('card_id') card_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<Card | null> {

        const result: resItem[] = await getManager()
            .createQueryBuilder(Card, 't1')
            .select('t1.*')
            .addSelect('t5.username', 't4_username')
            .where('t1.card_id= :card_id', { card_id })
            .leftJoinAndMapMany('t1.todos', 'todo', 't2', 't2.card_id=t1.card_id')
            .leftJoinAndMapMany('t1.links', 'link', 't3', 't3.card_id=t1.card_id')
            .leftJoinAndMapMany('t1.messages', 'message', 't4', 't4.card_id=t1.card_id')
            .leftJoin(User, 't5', 't4.user_id=t4.user_id')
            .orderBy('t4.data_of_creation', 'DESC')
            .getRawMany();

        //console.log(result);

        let card = new Card();
        let todos = new Map<number, Todo>();
        let messages = new Map<number, Message>();
        let links = new Map<number, Link>();

        result.forEach(item => {
            if (!card.card_id) {
                card = {
                    card_id: item.card_id,
                    name: item.name,
                    description: item.description,
                    order_index: item.order_index,
                    deadline: item.deadline,
                    list_id: item.list_id,
                    project_id: item.project_id,
                    todos: [] as Todo[],
                    messages: [] as Message[],
                    links: [] as Link[]
                } as Card;
            }

            if (card) {
                if (item.t2_todo_id) {
                    const todo = new Todo();
                    todo.todo_id = item.t2_todo_id
                    todo.name = item.t2_name
                  //  todo.description = item.t2_description
                    todo.done = item.t2_done
                    todo.card_id = item.t2_card_id
                    todo.project_id = item.t2_project_id
                    todos.set(todo.todo_id, todo);
                }

                if (item.t3_link_id) {
                    const link = new Link();
                    link.link_id = item.t3_link_id
                    link.name = item.t3_name
                    link.url = item.t3_url
                    link.card_id = item.t3_card_id
                    link.project_id = item.t3_project_id
                    links.set(link.link_id, link);
                }

                if (item.t4_message_id) {
                    const message = new Message();
                    message.message_id = item.t4_message_id;
                    message.content = item.t4_content;
                    message.user_id = item.t4_user_id;
                    message.card_id = item.t4_card_id;
                    message.project_id = item.t4_project_id;
                    message.data_of_creation = item.t4_data_of_creation;
                    message.username = item.t4_username;
                    messages.set(message.message_id, message);
                }
            }
        });

        card.todos = Array.from(todos.values());
        card.messages = Array.from(messages.values());
        card.links = Array.from(links.values());

        return card;
    }

}