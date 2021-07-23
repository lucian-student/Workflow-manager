import React, { createContext, useState } from 'react';

interface IMenuContext {
    editing: boolean
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuContext = createContext({
    editing: false,
    setEditing: null
});


export const MenuContextProvider = ({ children }) => {
    const [editing, setEditing] = useState<boolean>(false);
    return (
        <MenuContext.Provider value={{
            editing,
            setEditing
        }}>
            {children}
        </MenuContext.Provider>
    )
}