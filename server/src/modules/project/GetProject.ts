import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import Project from "../../entity/Project";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isProjectAccessible from "../../middleware/isProjectAccessible";
import isTeamMember from "../../middleware/isTeamMember";
import { getManager } from 'typeorm';
import List from "../../entity/List";
import Card from "../../entity/Card";

@Resolver()
export default class GetProjectResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamMember, isProjectAccessible)
    @Query(() => Project, { nullable: true })
    async getProject(
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Project | null> {

        const project = await getManager()
            .createQueryBuilder(Project, "t1")
            .where("t1.project_id = :project_id", { project_id })
            .leftJoin(List, 't2', 't2.project_id=t1.project_id')
            .leftJoin(Card, 't3', 't2.list_id=t3.list_id')
            .getOne();

        console.log(project)

        if (!project) {
            throw Error('Project doesnt exist!');
        }

        //Add joins to solve n+1 problem
        if (!project.lists) {
            project.lists = [];
        }
        project.lists.forEach(list => {
            if (!list.cards) {
                list.cards = [];
            } else {
                /* list.cards.forEach(card => {
                     if (!card.links) {
                         card.links = [];
                     }
                     if (!card.links) {
                         card.links = [];
                     }
                     if (!card.links) {
                         card.links = [];
                     }
                 })*/
            }
        });



        return project;
    }


}