import React, { createContext, useState, useContext, useEffect } from "react";
import { ManagerContext } from './manager';

interface ICardViewContext {
    card_id: string | null,
    setCard_id: React.Dispatch<React.SetStateAction<string>>
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CardViewContext = createContext<ICardViewContext>({
    card_id: null,
    setCard_id: null,
    open: false,
    setOpen: null
});

export const CardViewContextProvider = ({ children }) => {

    const { card_id, setCard_id } = useContext(ManagerContext);
    const [open, setOpen] = useState<boolean>(false);


    useEffect(() => {
        if (!open) {
            setCard_id(null);
        }
    }, [open]);
    
    return (
        <CardViewContext.Provider value={{
            card_id,
            setCard_id,
            open,
            setOpen
        }}>
            {children(card_id)}
        </CardViewContext.Provider>
    )
}