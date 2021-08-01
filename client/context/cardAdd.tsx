import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { LinkInput, List, TodoInput } from '../generated/apolloComponents';
import { ManagerContext } from './manager';

interface IMenuContext {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    list: List,
    setList: React.Dispatch<React.SetStateAction<List>>,
    links: LinkInput[],
    setLinks: React.Dispatch<React.SetStateAction<LinkInput[]>>,
    todos: TodoInput[],
    setTodos: React.Dispatch<React.SetStateAction<TodoInput[]>>,
    openTodoOptions: boolean,
    setOpenTodoOptions: React.Dispatch<React.SetStateAction<boolean>>,
    openLinkOptions: boolean,
    setOpenLinkOptions: React.Dispatch<React.SetStateAction<boolean>>
}

export const CardAddContext = createContext<IMenuContext>({
    open: false,
    setOpen: null,
    list: null,
    setList: null,
    links: [],
    setLinks: null,
    todos: [],
    setTodos: null,
    openTodoOptions: false,
    setOpenTodoOptions: null,
    openLinkOptions: false,
    setOpenLinkOptions: null
});



export const CardAddContextProvider = ({ children }) => {

    const [open, setOpen] = useState<boolean>(false);

    const { list, setList } = useContext(ManagerContext);

    const [links, setLinks] = useState<LinkInput[]>([]);

    const [todos, setTodos] = useState<TodoInput[]>([]);

    const [openTodoOptions, setOpenTodoOptions] = useState<boolean>(false);

    const [openLinkOptions, setOpenLinkOptions] = useState<boolean>(false);

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
            setTodos,
            openTodoOptions,
            setOpenTodoOptions,
            openLinkOptions,
            setOpenLinkOptions
        }}>
            {children(list)}
        </CardAddContext.Provider>
    )
}