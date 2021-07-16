import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import Project from "../../entity/Project";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamMember from "../../middleware/isTeamMember";
import { getManager } from 'typeorm';
import List from "../../entity/List";
import Card from "../../entity/Card";
import Message from "../../entity/Message";
import Link from "../../entity/Link";
import Todo from "../../entity/Todo";
import User from "../../entity/User";
import MyContext from "../../types/MyContext";


interface ResItem {
    t2_list_id: number | null,
    t2_name: string,
    t2_order_index: number,
    t2_project_id: number,
    t3_card_id: number | null,
    t3_name: string,
    t3_description: string,
    t3_order_index: 2,
    t3_deadline: Date,
    t3_list_id: number | null,
    t3_project_id: number,
    t4_todo_id: number | null,
    t4_name: string,
    t4_description: string,
    t4_done: boolean,
    t4_card_id: number,
    t4_project_id: number,
    t5_message_id: number | null,
    t5_content: string,
    t5_user_id: number | null,
    t5_card_id: number,
    t5_project_id: number,
    t5_data_of_creation: Date,
    t6_link_id: number | null,
    t6_name: string,
    t6_url: string,
    t6_card_id: number,
    t6_project_id: number,
    t5_username: string | null,
    project_id: number,
    status: string,
    deadline: Date,
    name: string,
    description: string,
    last_updated: Date,
    user_id: number,
    team_id: null
}


@Resolver()
export default class GetProjectResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamMember, isProjectAccessible)
    @Query(() => Project, { nullable: true })
    async getProject(
        @Arg('project_id') project_id: number,
        @Ctx() ctx: MyContext,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Project | null> {

        const res: ResItem[] = await getManager()
            .createQueryBuilder()
            .select('t1.*')
            .addSelect('t7.username', 't5_username')
            .from(Project, 't1')
            .where("t1.project_id = :project_id", { project_id })
            .leftJoinAndSelect(List, 't2', 't2.project_id=t1.project_id')
            .leftJoinAndSelect(Card, 't3', 't3.list_id=t2.list_id')
            .leftJoinAndSelect(Todo, 't4', 't4.card_id=t3.card_id')
            .leftJoinAndSelect(Message, 't5', 't5.card_id=t3.card_id')
            .leftJoinAndSelect(Link, 't6', 't6.card_id=t3.card_id')
            .leftJoin(User, 't7', 't7.user_id=t5.user_id')
            .orderBy('t2.order_index', 'ASC')
            .addOrderBy('t3.order_index', 'ASC')
            .getRawMany();

        if (!res) {
            return null;
        }

        if (res.length === 0) {
            return null;
        }

        const project = new Project();
        project.name = res[0].name;
        project.project_id = res[0].project_id;
        project.status = res[0].status;
        project.deadline = res[0].deadline;
        project.description = res[0].description;
        project.user_id = res[0].user_id;
        project.team_id = res[0].team_id;

        const tmpLists = new Map();

        res.forEach(item => {
            if (item.t2_list_id)
                if (!tmpLists.has(item.t2_list_id)) {

                    tmpLists.set(item.t2_list_id, {
                        list_id: item.t2_list_id,
                        name: item.t2_name,
                        order_index: item.t2_order_index,
                        project_id: item.t2_project_id,
                        cards: new Map()
                    });

                }

            if (item.t3_card_id) {
                const curr_list = tmpLists.get(item.t3_list_id)
                if (!curr_list.cards.has(item.t3_card_id)) {
                    curr_list.
                        cards.set(item.t3_card_id, {
                            card_id: item.t3_card_id,
                            name: item.t3_name,
                            description: item.t3_description,
                            order_index: item.t3_order_index,
                            deadline: item.t3_deadline,
                            list_id: item.t3_list_id,
                            project_id: item.t3_project_id,
                            todos: new Map(),
                            messages: new Map(),
                            links: new Map()
                        });
                }

                const curr_card = curr_list.cards.get(item.t3_card_id);

                if (item.t4_todo_id) {
                    curr_card.todos.set(item.t4_todo_id, {
                        todo_id: item.t4_todo_id,
                        name: item.t4_name,
                        description: item.t4_description,
                        done: item.t4_done,
                        card_id: item.t4_card_id,
                        project_id: item.t4_project_id,
                    });
                }

                if (item.t5_message_id) {
                    curr_card.messages.set(item.t5_message_id, {
                        message_id: item.t5_message_id,
                        content: item.t5_content,
                        user_id: item.t5_user_id,
                        card_id: item.t5_card_id,
                        project_id: item.t5_project_id,
                        data_of_creation: item.t5_data_of_creation,
                        username: item.t5_username,
                    });
                }

                if (item.t6_link_id) {
                    curr_card.links.set(item.t6_link_id, {
                        link_id: item.t6_link_id,
                        name: item.t6_name,
                        url: item.t6_url,
                        card_id: item.t6_card_id,
                        project_id: item.t6_project_id
                    });
                }

            }
        }, []);

        const lists = Array.from(tmpLists.values());

        lists.forEach(item => {
            if (item.cards) {
                item.cards = Array.from(item.cards.values());

                (item.cards as Card[]).forEach(card => {
                    if (card.todos) {
                        card.todos = Array.from(card.todos.values());
                        card.messages = Array.from(card.messages.values());
                        card.links = Array.from(card.links.values());
                    }
                })
            }
        });

        project.lists = lists;

        return project;
    }
}








/*
  const res: ResItem[] = await getManager()
            .createQueryBuilder()
            .select('t1.*', 'project')
            .from(Project, 't1')
            .where("t1.project_id = :project_id", { project_id })
            .leftJoinAndSelect(List, 't2', 't2.project_id=t1.project_id')
            .leftJoinAndSelect(qb => {
                const subQuery = qb
                    .select('t3.list_id')
                    .addSelect('t3.card_id')
                    .addSelect('t3.project_id')
                    .addSelect('t3.name')
                    .addSelect('t3.deadline')
                    .addSelect('t3.order_index')
                    .addSelect('count(distinct t5.todo_id)', 't3_todo_count')
                    .addSelect('count(distinct t6.link_id)', 't3_link_count')
                    .addSelect('count(distinct t7.message_id)', 't3_message_count')
                    .addSelect('count(distinct t8.todo_id)', 't3_done_todo_count')
                    .from(Card, 't3')
                    .leftJoin(Todo, 't5', 't5.card_id=t3.card_id')
                    .leftJoin(Link, 't6', 't6.card_id=t3.card_id')
                    .leftJoin(Message, 't7', 't7.card_Id=t3.card_id')
                    .leftJoin(Todo, 't8', 't8.card_Id=t3.card_id')
                    .where('t8.done=true')
                    .groupBy('t3.card_id')

                return subQuery;
            }, 't4', 't4.t3_list_id=t2.list_id')
            .orderBy('t2.order_index', 'ASC')
            .addOrderBy('t4.t3_order_index', 'ASC')
            .getRawMany();
*/

/*

interface ResItem {
    t2_list_id: number | null,
    t2_name: string,
    t2_order_index: number,
    t2_project_id: number,
    t3_card_id: number | null,
    t3_name: string,
    t3_order_index: number,
    t3_deadline: Date,
    t3_list_id: number,
    t3_project_id: number,
    t3_todo_count: number,
    t3_link_count: number,
    t3_message_count: number,
    t3_done_todo_count: number,
    project_id: number,
    status: string,
    deadline: Date,
    name: string,
    description: string,
    last_updated: Date
    user_id: number | null,
    team_id: number | null
}*/