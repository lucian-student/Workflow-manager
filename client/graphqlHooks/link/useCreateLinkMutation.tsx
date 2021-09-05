import React, { useEffect } from "react";
import { LinkResponse, useCreateLinkMutation as useMutation } from '../../generated/apolloComponents';
import createLinkUpdateProject from '../../subscriptionUpdates/link/createLinkUpdateProject';
import createLinkUpdateCard from '../../subscriptionUpdates/link/createLinkUpdateCard';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function useCreateLinkMutation({ project_id, card_id, team_id, setOpen }: Props) {

    const [createLinkMutation, { data }] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            createLinkUpdateProject(result.data.createLink as LinkResponse, project_id, proxy, team_id);
            createLinkUpdateCard(result.data.createLink as LinkResponse, project_id, proxy, team_id);
        }
    });

    useEffect(() => {
        if (data) {
            setOpen(false);
        }
    }, [data]);

    return {
        createLinkMutation
    }
}