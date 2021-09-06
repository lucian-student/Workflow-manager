import { useRouter } from "next/router";
import React, { createContext } from "react";
import { DeleteLinkResponse, LinkResponse, Project, useProjectListenerSubscription, Card, List } from "../generated/apolloComponents";
import editProjectUpdate from '../subscriptionUpdates/project/editProjectUpdate';
import deleteCardUpdate from '../subscriptionUpdates/card/deleteCardUpdate';
import editCardUpdateProject from '../subscriptionUpdates/card/editCardUpdateProject';
import moveCardUpdateProject from '../subscriptionUpdates/card/moveCardUpdateProject';
import createCardUpdate from '../subscriptionUpdates/card/createCardUpdate';
import createLinkUpdateProject from '../subscriptionUpdates/link/createLinkUpdateProject';
import deleteLinkUpdateProject from '../subscriptionUpdates/link/deleteLinkUpdateProject';
import createListUpdate from '../subscriptionUpdates/list/createListUpdate';
import deleteListUpdate from '../subscriptionUpdates/list/deleteListUpdate';
import moveListUpdate from '../subscriptionUpdates/list/moveListUpdate';
import editListUpdate from '../subscriptionUpdates/list/editListUpdate';

interface IProjectContext {
    role?: number,
    project: Project
}

export const ProjectContext = createContext<IProjectContext>({
    role: null,
    project: null
});

interface Props {
    children: any,
    role?: number,
    project: Project
}

export const ProjectContextProvider = ({ children, role, project }: Props) => {

    const router = useRouter();

    useProjectListenerSubscription({
        variables: {
            project_id: Number(project.project_id),
            team_id: Number(project.team_id)
        },
        onSubscriptionData: ({ client, subscriptionData }) => {

            if (!subscriptionData.data) {
                return;
            }

            const result = subscriptionData.data.projectListener;

            switch (result.topic) {
                case 'EDIT_PROJECT':
                    editProjectUpdate(result.editProject as Project, result.project_id, client, project.team_id);
                    break;
                case 'DELETE_PROJECT':
                    router.replace(`/team/${result.editProject.team_id}`);
                    break;
                case 'DELETE_CARD':
                    deleteCardUpdate(result.project_id, result.deleteCard, client, project.team_id);
                    break;
                case 'EDIT_CARD':
                    editCardUpdateProject(result.editCard as Card, project.project_id, client, project.team_id);
                    break;
                case 'MOVE_CARD':
                    moveCardUpdateProject(result.moveCard, project.project_id, client, true, project.team_id)
                    break;
                case 'CREATE_CARD':
                    createCardUpdate(result.createCard as Card, project.project_id, client, project.team_id);
                    break;
                case 'CREATE_LINK':
                    createLinkUpdateProject(result.createLink as LinkResponse, project.project_id, client, project.team_id);
                    break;
                case 'DELETE_LINK':
                    deleteLinkUpdateProject(result.deleteLink as DeleteLinkResponse, project.project_id, client, project.team_id);
                    break;
                case 'CREATE_LIST':
                    createListUpdate(result.createList as List, project.project_id, client, project.team_id);
                    break;
                case 'DELETE_LIST':
                    deleteListUpdate(result.deleteList, project.project_id, client, project.team_id);
                    break;
                case 'MOVE_LIST':
                    moveListUpdate(result.moveList, project.project_id, client, true, project.team_id);
                    break;
                case 'EDIT_LIST':
                    editListUpdate(result.editList as List, project.project_id, client, project.team_id);
                    break;
            }
        },
        skip: !project.team_id
    });

    return (
        <ProjectContext.Provider value={{
            role,
            project
        }}>
            {children}
        </ProjectContext.Provider>
    )
}