import React, { useEffect } from 'react';
import { MessageResponse, useEditMessageMutation as useMutatation } from '../../generated/apolloComponents';
import editMessageUpdate from '../../subscriptionUpdates/message/editMessageUpdate';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function useEditMessageMutation({ project_id, team_id, setOpen }: Props) {

    const [editMessageMutation, { data }] = useMutatation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            editMessageUpdate(result.data.editMessage as MessageResponse, project_id, proxy, team_id);
        }
    });

    useEffect(() => {
        if (data) {
            setOpen(false);
        }
    }, [data]);

    return {
        editMessageMutation
    }
}