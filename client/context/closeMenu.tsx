import React, { createContext } from 'react';
import { useDropDownMenu } from '../hooks/useDropdownMenu';


interface IMenuContext {
    editing: boolean
    setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    formRef: React.MutableRefObject<HTMLDivElement>
}

export const CloseMenuContext = createContext<IMenuContext>({
    editing: false,
    setEditing: null,
    formRef: null
});


export const CloseMenuContextProvider = ({ children }) => {

    const { open, setOpen, menuRef } = useDropDownMenu();

  

    return (
        <CloseMenuContext.Provider value={{
            editing: open,
            setEditing: setOpen,
            formRef: menuRef
        }}>
            {children}
        </CloseMenuContext.Provider>
    )
}