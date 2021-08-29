import React, { createContext, useState, useEffect,useContext } from 'react';
import { SortContext } from './sort';

interface ISearchContext {
    watchSearch: string,
    setWatchSearch: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBarContext = createContext<ISearchContext>({
    watchSearch: '',
    setWatchSearch: null
});

export const SearchBarContextProvider = ({ children }) => {
    const [watchSearch, setWatchSearch] = useState<string>('');

    const { setSortOptions } = useContext(SortContext);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSortOptions(old => {
                return {
                    order_param: old.order_param,
                    order: old.order,
                    search: watchSearch
                }
            });
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [watchSearch]);


    return (
        <SearchBarContext.Provider value={{
            watchSearch,
            setWatchSearch
        }}>
            {children}
        </SearchBarContext.Provider>
    )
}