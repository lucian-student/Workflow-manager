import React, { createContext } from "react";
import { useGetProjectQuery } from '../generated/apolloComponents';

export const ProjectContext = createContext({

});

export const ProjectContextProvider = ({ children }) => {


    /*   const { data, loading, error } = useGetProjectQuery({
           variables: {
               project_id: Number(project_id),
               team_id: Number(team_id)
           },
           fetchPolicy: 'network-only'
       });*/


    return (
        <ProjectContext.Provider value={{

        }}>
            {children}
        </ProjectContext.Provider>
    )
}