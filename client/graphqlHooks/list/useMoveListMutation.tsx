import { useMoveListMutation as useMutation } from '../../generated/apolloComponents';
import moveListUpdate from '../../subscriptionUpdates/list/moveListUpdate';

interface Props {
    project_id: string,
    team_id: string | null
}

export default function useMoveListMutation({ project_id, team_id }: Props) {

    const [moveListMutation] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            moveListUpdate(result.data.moveList, project_id, proxy, false, team_id);
        }
    });

    return {
        moveListMutation
    }
}