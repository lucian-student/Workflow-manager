import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import Project from '../../entity/Project';
import checkTypeOfProject from '../../middleware/checkTypeOfProject';
import isAuth from '../../middleware/isAuth';
import isProjectAccessible from '../../middleware/isProjectAccessible';
import isTeamAdmin from '../../middleware/isTeamAdmin';
import EditProjectInput from './EditProject/EditProjectInput';

@Resolver()
export default class EditProjectResolver {

    @UseMiddleware(isAuth, checkTypeOfProject, isTeamAdmin, isProjectAccessible)
    @Mutation(() => Project, { nullable: true })
    async editProject(
        @Arg('data') data: EditProjectInput,
        @Arg('project_id') project_id: number,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): Promise<Project | null> {
        const { status, deadline, description, name } = data;

        const project = await Project.findOne({ where: { project_id } });

        if (!project) {
            throw Error('Project doesnt exist!');
        }

        project.status = status;
        project.deadline = deadline;
        project.description = description;
        project.name = name;

        return project.save();
    }

}