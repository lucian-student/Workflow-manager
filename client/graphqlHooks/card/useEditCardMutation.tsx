import React, { useEffect } from 'react';
import { Card, Project, useEditCardMutation as useMutation } from '../../generated/apolloComponents';
import editCardUpdateProject from '../../subscriptionUpdates/card/editCardUpdateProject';
import editCardUpdateCard from '../../subscriptionUpdates/card/editCardUpdateCard';

interface Props {
    project_id: string
    team_id?: string
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
    project: Project
}

export function useEditCardMutation({
    project_id,
    team_id,
    setEditing,
    project
}: Props) {

    const [editCardMutation, editCard] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            editCardUpdateProject(result.data.editCard as Card, project_id, proxy, team_id);
            editCardUpdateCard(result.data.editCard as Card, project_id, proxy, team_id);
        }
    });

    useEffect(() => {
        if (editCard.data) {
            setEditing(false);
        }
    }, [editCard.data]);

    return {
        editCardMutation
    }
}