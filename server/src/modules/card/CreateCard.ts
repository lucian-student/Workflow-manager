import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Card from "../../entity/Card";
import checkTypeOfProject from "../../middleware/checkTypeOfProject";
import isAuth from "../../middleware/isAuth";
import isTeamAdmin from "../../middleware/isTeamAdmin";
import CardInput from "./shared/CardInput";

@Resolver()
export default class CreateCardResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin)
    @Mutation(() => Card)
    async createCard(
        @Arg('data') data: CardInput,
        @Arg('project_id') projecect_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ) {

    }

}