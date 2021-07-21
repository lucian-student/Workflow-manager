import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import Project from '../../entity/Project';
import isAuth from '../../middleware/isAuth';
import isProjectAccessible from '../../middleware/isProjectAccessible';
import EditProjectInput from './editProject/EditProjectInput';
import { getManager } from 'typeorm';
import checkIfTeamAdmin from '../../middleware/checkIfTeamAdmin';

@Resolver()
export default class EditProjectResolver {

    @UseMiddleware(isAuth, isProjectAccessible, checkIfTeamAdmin)
    @Mutation(() => Project)
    async editProject(
        @Arg('data') data: EditProjectInput,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Project> {
        const result = await getManager()
            .createQueryBuilder()
            .update(Project)
            .set({
                ...data,
                name:data.name.trimStart().trimEnd().replace(/\s+/g, " ")
            })
            .where('project_id= :project_id', { project_id })
            .returning('*')
            .execute();
        if (!result.raw) {
            throw Error('Message doesnt exist!');
        }

        const project = result.raw[0] as Project;

        return project;
    }

}