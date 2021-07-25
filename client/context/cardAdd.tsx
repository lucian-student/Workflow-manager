import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { List } from '../generated/apolloComponents';


interface IMenuContext {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    list: List,
    setList: React.Dispatch<React.SetStateAction<List>>
}

export const CardAddContext = createContext<IMenuContext>({
    open: false,
    setOpen: null,
    list: null,
    setList: null
});



export const CardAddContextProvider = ({ children }) => {

    const [open, setOpen] = useState<boolean>(false);

    const [list, setList] = useState<List | null>(null);

    useEffect(() => {
        if (!open) {
            setList(null);
        }
    }, [open])

    return (
        <CardAddContext.Provider value={{
            open,
            setOpen,
            list,
            setList
        }}>
            {children(list)}
        </CardAddContext.Provider>
    )
}