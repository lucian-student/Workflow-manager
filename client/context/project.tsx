import { useRouter } from "next/router";
import React, { createContext } from "react";
import { Project } from "../generated/apolloComponents";
import { useProjectListenerSubscription } from '../generated/apolloComponents';
import editProjectUpdate from '../subscriptionUpdates/editProjectUpdate';

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
                    editProjectUpdate({ ...result, editProject: result.editProject as Project }, project, client);
                    break;
                case 'DELETE_PROJECT':
                    router.replace(`/team/${result.editProject.team_id}`);
                    break;
            }

        },
        skip: !Number(project.team_id)
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