import { gql } from '@apollo/client';

export const projectListenerSubscription = gql`
subscription ProjectListener(
    $project_id:Float!
    $team_id:Float!
){
    projectListener(
        project_id:$project_id
        team_id:$team_id
    ){
        project_id
        topic 
        editProject{
            project_id
            name
            deadline
            status
            description
            user_id
            team_id
        }
        deleteCard{
            card_id
            list_id
        }
        editCard{
            project_id
            card_id
            list_id
            name
            description
            deadline
        }
        moveCard{
            list_id
            old_list_id
            card_id
            order_index
        }
        createCard{
            card_id
            name
            deadline
            project_id
            list_id
            order_index
            links {
                link_id
                name
                url
                card_id
                project_id
            }
            messages {
                message_id
                content
                user_id
                card_id
                project_id
                data_of_creation
                username
            }
            todos {
                todo_id
                name
                done
                card_id
                project_id
            }
        }
        createLink{
            link{
                link_id
                name
                url
                card_id
                project_id
            }
            list_id
        }
        deleteLink{
            list_id
            link_id
            card_id
        }
        editLink{
            link{
                link_id
                name
                url
                card_id
                project_id
            }
            list_id
        }
        createList{
            project_id
            list_id
            name
            order_index
            cards {
                card_id
                name
                deadline
                project_id
                list_id
                order_index
                links {
                link_id
                name
                url
                card_id
                project_id
                }
                messages {
                message_id
                content
                user_id
                card_id
                project_id
                data_of_creation
                username
                }
                todos {
                todo_id
                name
                done
                card_id
                project_id
                }
            }
        }
        deleteList
        moveList{
            order_index
            list_id
        }
        editList{
            project_id
            list_id
            name
            order_index
        }
        createMessage{
            message {
                message_id
                content
                user_id
                card_id
                project_id
                data_of_creation
                username
            }
            list_id
        }
        deleteMessage{
            message_id
            list_id
            card_id
        }
        createTodo{
            todo{
                todo_id
                name
                done
                card_id
                project_id
            }
            list_id
        }
        deleteTodo{
            todo_id
            list_id
            card_id
        }
        doneTodo{
            todo{
                todo_id
                name
                done
                card_id
                project_id
            }
            list_id
        }
    }
}
`;