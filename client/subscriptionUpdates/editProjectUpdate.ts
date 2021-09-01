import { ApolloClient } from "@apollo/client";
import { Project, ProjectListenerResponse } from "../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../graphql/project/query/getProject';

export default function editProjectUpdate(result: ProjectListenerResponse, project: Project, client: ApolloClient<Object>): void {

    const data = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project.project_id),
            team_id: !project.team_id ? null : Number(project.team_id)
        }
    }) as any;

    client.writeQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project.project_id),
            team_id: !project.team_id ? null : Number(project.team_id)
        },
        data: {
            getProject: update(data.getProject, {
                project: {
                    name: { $set: result.editProject.name },
                    status: { $set: result.editProject.status },
                    deadline: { $set: result.editProject.deadline },
                    description: { $set: result.editProject.description }
                }
            })
        }
    });

}