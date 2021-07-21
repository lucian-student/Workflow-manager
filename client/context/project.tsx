import React, { createContext } from "react";

export const ProjectContext = createContext({
    role: null
});

interface Props {
    children: any,
    role?: number
}

export const ProjectContextProvider = ({ children, role }: Props) => {
    return (
        <ProjectContext.Provider value={{
            role
        }}>
            {children}
        </ProjectContext.Provider>
    )
}