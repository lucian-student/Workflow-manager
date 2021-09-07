import { TodoResponse, useDoneTodoMutation as useMutation } from '../../generated/apolloComponents';
import doneTodoUpdateCard from '../../subscriptionUpdates/todo/doneTodoUpdateCard';
import doneTodoUpdateProject from '../../subscriptionUpdates/todo/doneTodoUpdateProject';

interface Props {
    project_id: string
    card_id: string
    team_id?: string
}

export function useDoneTodoMutation({ project_id, team_id }: Props) {

    const [doneTodoMutation] = useMutation({
        onError(err) {
            console.log(err);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }

            doneTodoUpdateCard(result.data.doneTodo as TodoResponse, project_id, proxy, team_id);
            doneTodoUpdateProject(result.data.doneTodo as TodoResponse, project_id, proxy, team_id);
        }
    });

    return {
        doneTodoMutation
    }
}