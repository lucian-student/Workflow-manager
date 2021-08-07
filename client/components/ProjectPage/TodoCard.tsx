import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
//import update from 'immutability-helper';
import { Todo, TodoInput } from '../../generated/apolloComponents';
import todoCardStyles from './TodoCard/TodoCard.module.css';
import { RiTodoLine } from 'react-icons/ri';
import TodoEditForm from './TodoEditForm';
import Options from './Options';
import { CardViewContext } from '../../context/cardView';
import { useDoneTodoMutation } from '../../graphqlHooks/todo/useDoneTodoMutation';
import { useEditTodoMutation } from '../../graphqlHooks/todo/useEditTodoMutation';
import { useDeleteTodoMutation } from '../../graphqlHooks/todo/useDeleteTodoMutation';
import { CardContext } from '../../context/card';
import { AiFillCheckCircle } from 'react-icons/ai';

interface Props {
    todo: Todo
}

interface RouterProps {
    project_id?: string,
    team_id?: string
}

function TodoCard({ todo }: Props): JSX.Element {

    const router = useRouter();
    const { project_id, team_id }: RouterProps = router.query;

    const [editing, setEditing] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const { setOpenTodoOptions } = useContext(CardViewContext);
    const { card } = useContext(CardContext);

    const { editTodoMutation } = useEditTodoMutation({
        setEditing,
        project_id,
        team_id,
        card_id: card.card_id
    });

    async function editTodo(editTodo: TodoInput) {
        await editTodoMutation({
            variables: {
                data: editTodo,
                project_id: Number(project_id),
                team_id: Number(team_id),
                todo_id: Number(todo.todo_id)
            }
        })
    }

    const { deleteTodoMutation } = useDeleteTodoMutation({
        setOpen,
        project_id,
        team_id,
        card_id: card.card_id
    });

    async function removeTodo() {
        await deleteTodoMutation({
            variables: {
                project_id: Number(project_id),
                team_id: Number(team_id),
                todo_id: Number(todo.todo_id)
            }
        });
    }

    const { doneTodoMutation } = useDoneTodoMutation({
        project_id,
        team_id,
        card_id: card.card_id
    });

    async function doneTodo(event: React.ChangeEvent<HTMLInputElement>) {
        await doneTodoMutation({
            variables: {
                done: event.target.checked,
                project_id: Number(project_id),
                team_id: Number(team_id),
                todo_id: Number(todo.todo_id)
            }
        })
    }

    useEffect(() => {
        if (open || editing) {
            setOpenTodoOptions(true);
        } else {
            setOpenTodoOptions(false);
        }
    }, [open, editing]);

    return (
        <div className={todoCardStyles.todo_input_card}>
            <div className={todoCardStyles.type_icon_wrapper}>
                <RiTodoLine className={todoCardStyles.type_icon} />
            </div>
            <div className={todoCardStyles.input_wrapper}>
                <div className={todoCardStyles.todo_data}>
                    <div className={todoCardStyles.text}>
                        {todo.name}
                    </div>
                    <form className={todoCardStyles.form}>
                        {todo.done && (
                            <AiFillCheckCircle className={todoCardStyles.checkbox_icon} />
                        )}
                        <div className={todo.done ? todoCardStyles.checkbox_wrapper :
                            [todoCardStyles.checkbox_wrapper, todoCardStyles.checkbox_wrapper_notchecked].join(' ')}>
                            <input
                                className={todoCardStyles.checkbox}
                                onChange={doneTodo.bind(this)}
                                name='done'
                                checked={todo.done}
                                type='checkbox' />
                        </div>
                    </form>
                </div>
                <div className={todoCardStyles.options_wrapper}>
                    <Options type='todo' setEditing={setEditing} open={open} setOpen={setOpen} remove={removeTodo} />
                </div>
            </div>
            {editing && (
                <TodoEditForm setOpen={setEditing} todo={todo} editTodo={editTodo} />
            )}
        </div>
    )
}

export default TodoCard;