import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import Project from '../../entity/Project';
import isAuth from '../../middleware/isAuth';
import isAdmin from '../../middleware/isAdmin';
import EditProjectInput from './EditProject/EditProjectInput';

@Resolver()
export default class EditProjectResolver {

    @UseMiddleware([isAuth, isAdmin])
    @Mutation(() => Project, { nullable: true })
    async editProject(
        @Arg('data') data: EditProjectInput,
        @Arg('project_id') project_id: number
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