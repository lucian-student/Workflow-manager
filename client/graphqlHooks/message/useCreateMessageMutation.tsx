import { MessageResponse, useCreateMessageMutation as useMutation } from '../../generated/apolloComponents';
import createMessageUpdateProject from '../../subscriptionUpdates/message/createMessageUpdateProject';
import createMessageUpdateCard from '../../subscriptionUpdates/message/createMessageUpdateCard';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
}

export function useCreateMessageMutation({ project_id, team_id }: Props) {

    const [createMessageMutation, { data }] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            createMessageUpdateProject(result.data.createMessage as MessageResponse, project_id, proxy, team_id);
            createMessageUpdateCard(result.data.createMessage as MessageResponse, project_id, proxy, team_id);
        }
    });

    return {
        createMessageMutation,
        message: data
    }
}