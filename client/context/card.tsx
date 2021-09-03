import React, { createContext, useContext, useEffect } from 'react';
import { Card } from '../generated/apolloComponents';
import { CardViewContext } from '../context/cardView';
import { ProjectContext } from '../context/project';
import { useCardListenerSubscription } from '../generated/apolloComponents';
import editCardUpdateCard from '../subscriptionUpdates/card/editCardUpdateCard';

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

    const { card_id, setCard_id } = useContext(CardViewContext);

    const { project } = useContext(ProjectContext);

    const { data } = useCardListenerSubscription({
        variables: {
            card_id: Number(card_id),
            project_id: Number(project.project_id),
            team_id: Number(project.team_id)
        },
        skip: !project.team_id,
        onSubscriptionData: ({ client, subscriptionData }) => {
            if (!subscriptionData.data) {
                return;
            }

            const result = subscriptionData.data.cardListener;

            switch (result.topic) {
                case 'EDIT_CARD':
                    editCardUpdateCard(result.editCard as Card, project.project_id, client, project.team_id);
                    break;
            }
        }
    });

    useEffect(() => {
        if (data) {
            if (data.cardListener.topic === 'DELETE_CARD') {
                setCard_id(null);
            }
        }
    }, [data]);

    return (
        <CardContext.Provider value={{
            card
        }}>
            {children}
        </CardContext.Provider>
    )
}