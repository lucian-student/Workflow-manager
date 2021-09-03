import { ApolloCache, ApolloClient } from "@apollo/client";
import { EditProjectMutation, Project } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

export default function editProjectUpdate(editProject: Project, project_id: string, client: ApolloClient<Object> | ApolloCache<EditProjectMutation>, team_id?: string): void {

    const data = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !team_id ? null : Number(team_id)
        }
    }) as any;

    client.writeQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !team_id ? null : Number(team_id)
        },
        data: {
            getProject: update(data.getProject, {
                project: {
                    name: { $set: editProject.name },
                    status: { $set: editProject.status },
                    deadline: { $set: editProject.deadline },
                    description: { $set: editProject.description }
                }
            })
        }
    });

}