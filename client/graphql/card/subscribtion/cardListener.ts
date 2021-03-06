import { gql } from '@apollo/client';

export const cardListenerSubscribtion = gql`
subscription CardListener(
    $card_id:Float!
    $team_id:Float!
    $project_id:Float!
){
    cardListener(
        card_id:$card_id
        team_id:$team_id
        project_id:$project_id
    ){
        project_id
        topic
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
        deleteList
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
        editMessage{
            message{
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
        editTodo{
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