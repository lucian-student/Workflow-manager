import { Arg, Ctx, Resolver, Subscription, UseMiddleware } from 'type-graphql';
import MyContext from '../../types/MyContext';
import Project from '../../entity/Project';
import { getManager } from 'typeorm';
import Team from "../../entity/Team";
import UserTeamConnection from "../../entity/UserTeamConnection";

export const EDIT_PROJECT = 'EDIT_PROJECT';

interface Arguments {
    team_id?: number,
    project_id: number
}

interface Context {
    user_id: number
}

@Resolver()
export default class ProjectListenerResolver {

    @Subscription(() => String, {
        topics: [EDIT_PROJECT],
        filter: async ({ args, payload, context }: { args: Arguments, context: Context, payload: any }) => {

            if (context.user_id === null) {
                return false;
            }

            if (args.project_id !== payload.project_id) {
                return false;
            }

            //here check if jwt is valid

            let access: boolean = true;

            if (args.team_id) {
                const result = await getManager()
                    .createQueryBuilder()
                    .select('t1.project_id', 'project_id')
                    .addSelect('t3.role', 'role')
                    .from(Project, 't1')
                    .innerJoin(Team, 't2', 't2.team_id=t1.team_id')
                    .innerJoin(UserTeamConnection, 't3', 't3.team_id=t2.team_id')
                    .where('t3.user_id= :user_id', { user_id: context.user_id })
                    .andWhere('t1.project_id= :project_id', { project_id: payload.project_id })
                    .andWhere('t3.confirmed=true')
                    .getRawOne();

                if (!result) {
                    access = false;
                }
            } else {
                access = false;
            }

            return (access) /*&& payload.user_id !== context.user_id;*/
        }
    })
    projectListener(
        @Arg('project_id') project_id: number,
        @Ctx() ctx: MyContext,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): string {

        return 'hello';
    }

}