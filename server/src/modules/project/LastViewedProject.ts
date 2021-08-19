import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import Project from '../../entity/Project';
import isAuth from '../../middleware/isAuth';
import isProjectAccessible from '../../middleware/isProjectAccessible';
@Resolver()
export default class LastViewedProjectResolver {

    @UseMiddleware(isAuth, isProjectAccessible)
    @Mutation(() => Boolean)
    async lastViewedProject(
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id: number
    ): Promise<boolean> {

        await Project.update({ project_id }, { last_updated: () => 'current_timestamp' });

        return true;
    }

}