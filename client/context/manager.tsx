import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { List } from '../generated/apolloComponents';

interface IManagerContext {
    list: List | null
    setList: React.Dispatch<React.SetStateAction<List>>
    card_id: string | null
    setCard_id: React.Dispatch<React.SetStateAction<string>>
}

export const ManagerContext = createContext<IManagerContext>({
    list: null,
    setList: null,
    card_id: null,
    setCard_id: null
});

export const ManagerContextProvider = ({ children }) => {

    const [list, setList] = useState<List | null>(null);
    const [card_id, setCard_id] = useState<string | null>(null);

    useEffect(() => {
        if (card_id) {
            setList(null);
        }
    }, [card_id]);

    useEffect(() => {
        if (list) {
            setCard_id(null);
        }
    }, [list]);

    return (
        <ManagerContext.Provider value={{
            list,
            setList,
            card_id,
            setCard_id
        }}>
            {children}
        </ManagerContext.Provider>
    )
}