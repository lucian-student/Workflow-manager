import { DeleteMessageResponse, useDeleteMessageMutation as useMutation } from '../../generated/apolloComponents';
import deleteMessageUpdateCard from '../../subscriptionUpdates/message/deleteMessageUpdateCard';
import deleteMessageUpdateProject from '../../subscriptionUpdates/message/deleteMessageUpdateProject';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
}

export function useDeleteMessageMutation({ project_id, team_id }: Props) {

    const [deleteMessageMutation] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            deleteMessageUpdateCard(result.data.deleteMessage as DeleteMessageResponse, project_id, proxy, team_id);
            deleteMessageUpdateProject(result.data.deleteMessage as DeleteMessageResponse, project_id, proxy, team_id);
        }
    });

    return {
        deleteMessageMutation
    }
}