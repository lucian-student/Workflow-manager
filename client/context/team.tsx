import React, { createContext, useCallback, useContext, useState } from 'react';
import { Team } from '../generated/apolloComponents';
import { AuthContext } from '../context/auth';

interface ITeamContext {
    getRole: () => number,
    displaying: 'projects' | 'members',
    setDisplaying: React.Dispatch<React.SetStateAction<'projects' | 'members'>>
}

export const TeamContext = createContext<ITeamContext>({
    getRole: () => { return null },
    displaying: 'projects',
    setDisplaying: null
});

interface Props {
    team: Team,
    children: (displaying:'projects' | 'members')=>any
}

export const TeamContextProvider = ({ children, team }: Props) => {

    const { currentUser } = useContext(AuthContext);

    const [displaying, setDisplaying] = useState<'projects' | 'members'>('projects');

    const getRole = useCallback(() => {

        if (!(currentUser !== true && currentUser !== false)) {
            return null;
        }

        const role = team.cons[team.cons.findIndex(con => Number(con.user_id) === Number(currentUser.user_id))].role;

        return role;
    }, [team.cons, currentUser]);

    return (
        <TeamContext.Provider value={{
            getRole,
            displaying,
            setDisplaying
        }}>
            {children(displaying)}
        </TeamContext.Provider>
    )
}