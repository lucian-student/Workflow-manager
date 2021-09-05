import { DeleteLinkResponse, useDeleteLinkMutation as useMutation } from '../../generated/apolloComponents';
import deleteLinkUpdateCard from '../../subscriptionUpdates/link/deleteLinkUpdateCard';
import deleteLinkUpdateProject from '../../subscriptionUpdates/link/deleteLinkUpdateProject';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
}

export function useDeleteLinkMutation({ project_id, card_id, team_id }: Props) {

    const [deleteLinkMutation] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            deleteLinkUpdateCard(result.data.deleteLink as DeleteLinkResponse, project_id, proxy, team_id);
            deleteLinkUpdateProject(result.data.deleteLink as DeleteLinkResponse, project_id, proxy, team_id);
        }
    });

    return {
        deleteLinkMutation
    }
}