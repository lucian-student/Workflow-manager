import { useEffect, useContext } from 'react';
import { useDeleteCardMutation as useMutation } from '../../generated/apolloComponents';
import { CardViewContext } from '../../context/cardView';
import deleteCardUpdate from '../../subscriptionUpdates/card/deleteCardUpdate';

interface Props {
    project_id: string
    team_id?: string
}

export function useDeleteCardMutation({ project_id, team_id }: Props) {

    const { setCard_id } = useContext(CardViewContext);

    const [deleteCardMutation, { data }] = useMutation({
        onError(err) {
            console.log(err)
        },
        update(proxy, result) {
            if (team_id) {
                return;
            }
            deleteCardUpdate(project_id, result.data.deleteCard, proxy, team_id);
        }
    });

    useEffect(() => {
        if (data && !team_id) {
            setCard_id(null);
        }
    }, [data, team_id]);

    return {
        deleteCardMutation
    }
}