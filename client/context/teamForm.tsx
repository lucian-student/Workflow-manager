import React, { createContext, useState } from 'react';
import { TeamInput } from '../generated/apolloComponents';

interface ITeamForm {
    step:string,
    setStep: React.Dispatch<React.SetStateAction<string>>
    teamData: TeamInput
    setTeamData: React.Dispatch<React.SetStateAction<TeamInput>>
}

export const TeamFormContext = createContext<ITeamForm>({
    step: '1',
    setStep: null,
    teamData: null,
    setTeamData: null
});

export const TeamFormContextProvider = ({ children }:{children:(step:string)=>any}) => {

    const [step, setStep] = useState<string>('1');

    const [teamData, setTeamData] = useState<TeamInput>(null);

    return (
        <TeamFormContext.Provider value={{
            step,
            setStep,
            teamData,
            setTeamData
        }}>
            {children(step)}
        </TeamFormContext.Provider>
    )
}

