import React, { createContext, useState } from 'react';

interface ISortContext {
    sortOptions: {
        order_param: string;
        order: string;
        search: string;
    },
    setSortOptions: React.Dispatch<React.SetStateAction<{
        order_param: string;
        order: string;
        search: string;
    }>>
}

export const ProjectSortContext = createContext<ISortContext>({
    sortOptions: {
        order_param: 'last_viewed',
        order: '_desc',
        search: ''
    },
    setSortOptions: null
});

export const ProjectSortContextProvider = ({ children }) => {
    const [sortOptions, setSortOptions] = useState({
        order_param: 'last_viewed',
        order: '_desc',
        search:''
    });

    return (
        <ProjectSortContext.Provider value={{
            sortOptions,
            setSortOptions
        }}>
            {children}
        </ProjectSortContext.Provider>
    )
}