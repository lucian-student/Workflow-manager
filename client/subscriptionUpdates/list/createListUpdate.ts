import { ApolloCache, ApolloClient } from "@apollo/client";
import { GetProjectResponse, List, CreateListMutation } from "../../generated/apolloComponents";
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';

export default function createListUpdate(createList: List, project_id: string, client: ApolloClient<Object> | ApolloCache<CreateListMutation>, team_id?: string): void {

    const data = client.readQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !Number(team_id) ? null : Number(team_id)
        }
    }) as { getProject: GetProjectResponse };

    const updatedProject = update(data.getProject, {
        project: { lists: { $push: [createList] } }
    });

    client.writeQuery({
        query: getProjectQuery,
        variables: {
            project_id: Number(project_id),
            team_id: !Number(team_id) ? null : Number(team_id)
        },
        data: {
            getProject: updatedProject
        }
    });
}