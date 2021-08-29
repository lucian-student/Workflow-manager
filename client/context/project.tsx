import React, { createContext } from "react";
import { Project } from "../generated/apolloComponents";
import { useProjectListenerSubscription } from '../generated/apolloComponents';

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

    useProjectListenerSubscription({
        variables: {
            project_id: Number(project.project_id)
        },
        onSubscriptionData() {
            console.log('recived data');
        }
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