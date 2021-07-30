import React, { createContext } from "react";

export const CardContext = createContext({

});

export const CardContextProvider = ({ children }) => {

    return (
        <CardContext.Provider value={{
            
        }}>
            {children}
        </CardContext.Provider>
    )
}