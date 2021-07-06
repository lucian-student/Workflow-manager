import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import Project from "../../entity/Project";
import isAuth from "../../middleware/isAuth";
import isMember from "../../middleware/isMember";

@Resolver()
export default class GetProjectResolver {

    @UseMiddleware(isAuth, isMember)
    @Query(() => Project, { nullable: true })
    async getProject(
        @Arg('project_id') project_id: number
    ): Promise<Project | null> {

        const project = await Project.findOne({ where: { project_id } });

        if (!project) {
            return null;
        }
        //project.lists[0].cards

        //parse null to empty array
        if (!project.lists) {
            project.lists = [];

            return project;
        }
        //Add joins to solve n+1 problem
        project.lists.forEach(list => {
            if (!list.cards) {
                list.cards = [];
            } else {
                list.cards.forEach(card => {
                    if (!card.links) {
                        card.links = [];
                    }
                    if (!card.links) {
                        card.links = [];
                    }
                    if (!card.links) {
                        card.links = [];
                    }
                })
            }
        });



        return project;
    }


}