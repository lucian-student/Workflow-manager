import React, { createContext } from 'react';
import { Card } from '../generated/apolloComponents';

interface ICardContext {
    card: Card
}

export const CardContext = createContext<ICardContext>({
    card: null
});


interface Props {
    children: any,
    card: Card
}

export const CardContextProvider = ({ children, card }: Props) => {
    return (
        <CardContext.Provider value={{
            card
        }}>
            {children}
        </CardContext.Provider>
    )
}