import React, { createContext } from 'react';

const TeamFormContext = createContext({

});

export const TeamFormContextProvider = ({ children }) => {

    return (
        <TeamFormContext.Provider value={{

        }}>
            {children}
        </TeamFormContext.Provider>
    )
}

