import React, { createContext } from "react";
import { Project } from "../generated/apolloComponents";


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
    return (
        <ProjectContext.Provider value={{
            role,
            project
        }}>
            {children}
        </ProjectContext.Provider>
    )
}