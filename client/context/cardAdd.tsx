import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { LinkInput, List, TodoInput } from '../generated/apolloComponents';


interface IMenuContext {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    list: List,
    setList: React.Dispatch<React.SetStateAction<List>>,
    links: LinkInput[],
    setLinks: React.Dispatch<React.SetStateAction<LinkInput[]>>,
    todos: TodoInput[],
    setTodos: React.Dispatch<React.SetStateAction<TodoInput[]>>
}

export const CardAddContext = createContext<IMenuContext>({
    open: false,
    setOpen: null,
    list: null,
    setList: null,
    links: [],
    setLinks: null,
    todos: [],
    setTodos: null
});



export const CardAddContextProvider = ({ children }) => {

    const [open, setOpen] = useState<boolean>(false);

    const [list, setList] = useState<List | null>(null);

    const [links, setLinks] = useState<LinkInput[]>([]);

    const [todos, setTodos] = useState<TodoInput[]>([]);

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
            setList,
            links,
            setLinks,
            todos,
            setTodos
        }}>
            {children(list)}
        </CardAddContext.Provider>
    )
}