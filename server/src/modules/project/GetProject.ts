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
import MyContext from "../../types/MyContext";



interface ResItem {
    t2_list_id: number | null,
    t2_name: string | null,
    t2_order_index: number | null,
    t2_project_id: number | null,
    t3_card_id: number | null,
    t3_name: number | null,
    t3_description: number | null,
    t3_order_index: | null,
    t3_deadline: Date | null,
    t3_list_id: number | null,
    t3_project_id: number | null,
    t4_todo_id: number | null,
    t4_name: string | null,
    t4_description: string | null,
    t4_done: boolean | null,
    t4_card_id: number | null,
    t4_project_id: number | null,
    project_id: number,
    status: string,
    deadline: Date,
    name: string,
    description: string,
    last_updated: Date,
    user_id: number | null,
    team_id: number | null
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
            .createQueryBuilder(Project, "t1")
            .select('t1.*', 'project')
            .where("t1.project_id = :project_id", { project_id })
            .leftJoinAndSelect(List, 't2', 't2.project_id=t1.project_id')
            .leftJoinAndSelect(Card, 't3', 't2.list_id=t3.list_id')
            .leftJoinAndSelect(Todo, 't4', 't4.card_id=t3.card_id')
            .orderBy('t2.order_index', 'ASC')
            .addOrderBy('t3.order_index', 'ASC')
            .getRawMany();

        if (!res) {
            return null;
        }

        if (res.length === 0) {
            return null;
        }

        const project = ctx.payload.curr_project as Project;

        const tmpLists = new Map();

        res.forEach(item => {

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

                tmpLists.get(item.t3_list_id).
                    cards.set(item.t3_card_id, {
                        card_id: item.t3_card_id,
                        name: item.t3_name,
                        description: item.t3_description,
                        order_index: item.t3_order_index,
                        deadline: item.t3_deadline,
                        list_id: item.t3_list_id,
                        project_id: item.t3_project_id,
                        todos: []
                    });
            }

            if (item.t4_todo_id) {

                tmpLists.get(item.t3_list_id)
                    .cards.get(item.t3_card_id)
                    .todos.push({
                        todo_id: item.t4_todo_id,
                        name: item.t4_name,
                        description: item.t4_description,
                        done: item.t4_done,
                        card_id: item.t4_card_id,
                        project_id:item.t4_project_id
                    })
            }

        }, []);

        const lists = Array.from(tmpLists.values());

        lists.forEach(item => {
            if (item.cards) {
                item.cards = Array.from(item.cards.values());
            }
        })

        project.lists = lists;

        return project;
    }


}