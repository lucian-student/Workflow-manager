import React, { createContext, useState } from 'react';

interface ISortContext {
    sortOptions: {
        order_param: string;
        order: string;
        search: string | boolean;
    },
    setSortOptions: React.Dispatch<React.SetStateAction<{
        order_param: string;
        order: string;
        search: string | boolean;
    }>>
}

export const SortContext = createContext<ISortContext>({
    sortOptions: {
        order_param: '',
        order: '',
        search: ''
    },
    setSortOptions: null
});

interface Props {
    type: 'project' | 'member',
    children: any
}

export const SortContextProvider = ({ children, type }: Props) => {
    const [sortOptions, setSortOptions] = useState({
        order_param: type === 'project' ? 'last_viewed' : type === 'member' && 'role',
        order: type === 'project' ? '_desc' : type === 'member' && '_asc',
        search: false
    });

    return (
        <SortContext.Provider value={{
            sortOptions,
            setSortOptions
        }}>
            {children}
        </SortContext.Provider>
    )
}