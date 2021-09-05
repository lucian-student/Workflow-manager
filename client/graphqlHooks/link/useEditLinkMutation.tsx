import React, { useEffect } from 'react';
import { useEditLinkMutation as useMutation, LinkResponse } from '../../generated/apolloComponents';
import editLinkUpdate from '../../subscriptionUpdates/link/editLinkUpdate';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function useEditLinkMutation({ project_id, card_id, team_id, setOpen }: Props) {

    const [editLinkMutation, { data }] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            editLinkUpdate(result.data.editLink as LinkResponse, project_id, proxy, team_id);
        }
    });

    useEffect(() => {
        if (data) {
            setOpen(false);
        }
    }, [data]);

    return {
        editLinkMutation
    }
}