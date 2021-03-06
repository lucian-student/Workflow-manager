import React, { createContext, useContext, useEffect } from 'react';
import { CardViewContext } from '../context/cardView';
import { ProjectContext } from '../context/project';
import { useCardListenerSubscription, LinkResponse, Card, DeleteLinkResponse, MessageResponse, TodoResponse } from '../generated/apolloComponents';
import editCardUpdateCard from '../subscriptionUpdates/card/editCardUpdateCard';
import createLinkUpdateCard from '../subscriptionUpdates/link/createLinkUpdateCard';
import deleteLinkUpdateCard from '../subscriptionUpdates/link/deleteLinkUpdateCard';
import editLinkUpdate from '../subscriptionUpdates/link/editLinkUpdate';
import moveCardUpdateCard from '../subscriptionUpdates/card/moveCardUpdateCard';
import createMessageUpdateCard from '../subscriptionUpdates/message/createMessageUpdateCard';
import deleteMessageUpdateCard from '../subscriptionUpdates/message/deleteMessageUpdateCard';
import editMessageUpdate from '../subscriptionUpdates/message/editMessageUpdate';
import createTodoUpdateCard from '../subscriptionUpdates/todo/createTodoUpdateCard';
import deleteTodoUpdateCard from '../subscriptionUpdates/todo/deleteTodoUpdateCard';
import doneTodoUpdateCard from '../subscriptionUpdates/todo/doneTodoUpdateCard';
import editTodoUpdate from '../subscriptionUpdates/todo/editTodoUpdate';

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
                case 'MOVE_CARD':
                    moveCardUpdateCard(result.moveCard, project.project_id, client, project.team_id);
                    break;
                case 'CREATE_LINK':
                    createLinkUpdateCard(result.createLink as LinkResponse, project.project_id, client, project.team_id);
                    break;
                case 'DELETE_LINK':
                    deleteLinkUpdateCard(result.deleteLink as DeleteLinkResponse, project.project_id, client, project.team_id);
                    break;
                case 'EDIT_LINK':
                    editLinkUpdate(result.editLink as LinkResponse, project.project_id, client, project.team_id);
                    break;
                case 'CREATE_MESSAGE':
                    createMessageUpdateCard(result.createMessage as MessageResponse, project.project_id, client, project.team_id);
                    break;
                case 'DELETE_MESSAGE':
                    deleteMessageUpdateCard(result.deleteMessage, project.project_id, client, project.team_id);
                    break;
                case 'EDIT_MESSAGE':
                    editMessageUpdate(result.editMessage as MessageResponse, project.project_id, client, project.team_id);
                    break;
                case 'CREATE_TODO':
                    createTodoUpdateCard(result.createTodo as TodoResponse, project.project_id, client, project.team_id);
                    break;
                case 'DELETE_TODO':
                    deleteTodoUpdateCard(result.deleteTodo, project.project_id, client, project.team_id);
                    break;
                case 'DONE_TODO':
                    doneTodoUpdateCard(result.doneTodo as TodoResponse, project.project_id, client, project.team_id);
                    break;
                case 'EDIT_TODO':
                    editTodoUpdate(result.editTodo as TodoResponse, project.project_id, client, project.team_id);
                    break;
            }
        }
    });

    useEffect(() => {
        if (data) {
            if (data.cardListener.topic === 'DELETE_CARD') {
                setCard_id(null);
            }
            if (data.cardListener.topic === 'DELETE_LIST') {
                if (data.cardListener.deleteList === card.list_id) {
                    setCard_id(null);
                }
            }
        }
    }, [data, card.list_id]);



    return (
        <CardContext.Provider value={{
            card
        }}>
            {children}
        </CardContext.Provider>
    )
}