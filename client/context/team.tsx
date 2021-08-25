import React, { createContext, useCallback, useContext, useState } from 'react';
import { Team } from '../generated/apolloComponents';
import { AuthContext } from '../context/auth';

interface ITeamContext {
    getRole: () => number,
    displaying: 'projects' | 'members',
    setDisplaying: React.Dispatch<React.SetStateAction<'projects' | 'members'>>,
    roles: Map<number, string>
    team: Team
}

export const TeamContext = createContext<ITeamContext>({
    getRole: () => { return null },
    displaying: 'projects',
    setDisplaying: null,
    roles: new Map<number, string>(),
    team: null
});

interface Props {
    team: Team,
    children: (displaying: 'projects' | 'members', getRole: () => number) => any
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

    const roles = new Map<number, string>([[1, 'Owner'], [2, "Admin"], [3, "member"]]);

    return (
        <TeamContext.Provider value={{
            getRole,
            displaying,
            setDisplaying,
            roles,
            team
        }}>
            {children(displaying, getRole)}
        </TeamContext.Provider>
    )
}