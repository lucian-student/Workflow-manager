import React, { createContext, useState } from 'react';

interface IMenuContext {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuContext = createContext<IMenuContext>({
    open: false,
    setOpen: null
});


export const MenuContextProvider = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <MenuContext.Provider value={{
            open,
            setOpen
        }}>
            {children}
        </MenuContext.Provider>
    )
}