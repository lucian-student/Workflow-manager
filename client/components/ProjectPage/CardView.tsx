import React, { useContext, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { VscAdd } from 'react-icons/vsc';
import { ImCancelCircle } from 'react-icons/im';
import cardViewStyles from './CardView/CardView.module.css';
import { useStackingMenuCustom } from '../../hooks/useStackingMenuCustom';
import { CardViewContext } from '../../context/cardView';
import { Card, CardInput, Link, LinkInput, Message, MessageInput, Todo, TodoInput, useGetCardQuery } from '../../generated/apolloComponents';
import { CardContextProvider } from '../../context/card';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { ProjectContext } from '../../context/project';
import CardDataForm from './CardDataForm';
import CardData from './CardData';
import { useTwoPartMenuCustom } from '../../hooks/useTwoPartMenuCustom';
import { useEffect } from 'react';
import { MenuContext } from '../../context/menu';
import LinkForm from './LinkForm';
import TodoForm from './TodoForm';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import TodoDisplay from './TodoDisplay';
import LinkDisplay from './LinkDisplay';
import { useEditCardMutation } from '../../graphqlHooks/card/useEditCardMutation';
import { useCreateTodoMutation } from '../../graphqlHooks/todo/useCreateTodoMutation';
import { useCreateLinkMutation } from '../../graphqlHooks/link/useCreateLinkMutation';
import MessageForm from './MessageForm';
import MessageDisplay from './MessageDisplay';
import { useCreateMessageMutation } from '../../graphqlHooks/message/useCreateMessageMutation';
import { useDeleteCardMutation } from '../../graphqlHooks/card/useDeleteCardMutation';

interface Props {
    project_id?: string,
    team_id?: string
}

function CardView(): JSX.Element {

    const { role, project } = useContext(ProjectContext);

    const { setOpen, card_id, openLinkOptions, openTodoOptions } = useContext(CardViewContext);

    const { menuRef } = useStackingMenuCustom({ setOpen });

    const blockClose = useContext(MenuContext);

    const router = useRouter();
    const { project_id, team_id }: Props = router.query;

    const [editing, setEditing] = useState<boolean>(false);

    const editForm = useTwoPartMenuCustom({ setOpen: setEditing });

    const [openLinkForm, setOpenLinkForm] = useState<boolean>(false);

    const linkForm = useDropdownCustom({ setOpen: setOpenLinkForm });

    const [openTodoForm, setOpenTodoForm] = useState<boolean>(false);

    const todoForm = useDropdownCustom({ setOpen: setOpenTodoForm });

    const { data, error, loading } = useGetCardQuery({
        variables: {
            project_id: Number(project_id),
            card_id: Number(card_id),
            team_id: Number(team_id)
        },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-only'
    });

    useEffect(() => {
        if (editing || openLinkForm || openTodoForm || openTodoOptions || openLinkOptions) {
            blockClose.setOpen(true);
        } else {
            blockClose.setOpen(false);
        }
    }, [editing, openLinkForm, openTodoForm, openTodoOptions, openLinkOptions]);


    const { editCardMutation } = useEditCardMutation({
        project,
        project_id,
        team_id,
        setEditing
    });

    async function saveCard(input: CardInput) {
        await editCardMutation({
            variables: {
                data: input,
                team_id: Number(team_id),
                project_id: Number(project_id),
                card_id: Number(card_id)
            }
        })
    }

    const { createTodoMutation } = useCreateTodoMutation({
        project_id,
        team_id,
        card_id,
        setOpen: setOpenTodoForm
    });

    async function addTodo(todo: TodoInput) {
        await createTodoMutation({
            variables: {
                data: todo,
                team_id: Number(team_id),
                project_id: Number(project_id),
                card_id: Number(card_id)
            }
        });
    }

    const { createLinkMutation } = useCreateLinkMutation({
        project_id,
        team_id,
        card_id,
        setOpen: setOpenLinkForm
    });

    async function addLink(link: LinkInput) {
        await createLinkMutation({
            variables: {
                data: link,
                team_id: Number(team_id),
                project_id: Number(project_id),
                card_id: Number(card_id)
            }
        });
    }

    const { createMessageMutation, message } = useCreateMessageMutation({
        project_id,
        team_id,
        card_id
    });

    async function addMessage(message: MessageInput) {
        if (message.content.length < 1) {
            return;
        } else {
            await createMessageMutation({
                variables: {
                    data: message,
                    team_id: Number(team_id),
                    project_id: Number(project_id),
                    card_id: Number(card_id)
                }
            });
        }
    }

    const { deleteCardMutation } = useDeleteCardMutation({
        project_id,
        team_id
    });

    async function deleteCard() {
        await deleteCardMutation({
            variables: {
                team_id: Number(team_id),
                project_id: Number(project_id),
                card_id: Number(card_id)
            }
        });
    }

    if (loading) {
        return (
            <Fragment>
            </Fragment>
        )
    }

    if (error) {
        return (
            <Fragment>
            </Fragment>
        )
    }

    return (
        <div className={cardViewStyles.modal_bg}>
            <div ref={menuRef} className={cardViewStyles.modal}>
                {data && (
                    <Fragment>
                        {data.getCard && (
                            <CardContextProvider card={data.getCard as Card}>
                                <ImCancelCircle className={cardViewStyles.cancel_modal}
                                    onClick={() => setOpen(false)} />
                                {!role ? (
                                    <div className={cardViewStyles.icon_wrapper}>
                                        <button ref={editForm.toggleButtonRef} className={[cardViewStyles.toggle_button, cardViewStyles.toggle].join(' ')}
                                            onClick={() => setEditing(old => !old)}>
                                            <AiOutlineEdit className={cardViewStyles.icon} />
                                        </button>
                                        <button ref={editForm.toggleButtonRef} className={cardViewStyles.toggle_button}
                                            onClick={deleteCard}>
                                            <AiFillDelete className={cardViewStyles.icon} />
                                        </button>
                                    </div>
                                ) : (
                                    <Fragment>
                                        {role <= 2 && (
                                            <div className={cardViewStyles.icon_wrapper}>
                                                <button ref={editForm.toggleButtonRef} className={[cardViewStyles.toggle_button, cardViewStyles.toggle].join(' ')}
                                                    onClick={() => setEditing(old => !old)}>
                                                    <AiOutlineEdit className={cardViewStyles.icon} />
                                                </button>
                                                <button ref={editForm.toggleButtonRef} className={cardViewStyles.toggle_button}
                                                    onClick={deleteCard}>
                                                    <AiFillDelete className={cardViewStyles.icon} />
                                                </button>
                                            </div>
                                        )}
                                    </Fragment>
                                )}
                                <div className={cardViewStyles.modal_content}>
                                    <div className={cardViewStyles.card_data_wrapper}>
                                        <CardData card={data.getCard as Card} />
                                        {editing && (
                                            <div ref={editForm.menuRef} className={cardViewStyles.data_form_wrapper}>
                                                <CardDataForm createCard={saveCard} card={data.getCard as Card} />
                                            </div>
                                        )}
                                    </div>
                                    {!role ? (
                                        <div className={cardViewStyles.options}>
                                            <div ref={todoForm.menuRef}>
                                                <button className={cardViewStyles.toggle_button_2}
                                                    onClick={() => setOpenTodoForm(old => !old)}>
                                                    <VscAdd className={cardViewStyles.icon_2} />
                                                    <div>Add Todo</div>
                                                </button>
                                                {openTodoForm && (
                                                    <TodoForm addTodo={addTodo} />
                                                )}
                                            </div>
                                            <div ref={linkForm.menuRef}>
                                                <button className={cardViewStyles.toggle_button_2}
                                                    onClick={() => setOpenLinkForm(old => !old)}>
                                                    <VscAdd className={cardViewStyles.icon_2} />
                                                    <div>Add Link</div>
                                                </button>
                                                {openLinkForm && (
                                                    <LinkForm addLink={addLink} />
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Fragment>
                                            {role <= 2 && (
                                                <div className={cardViewStyles.options}>
                                                    <div ref={todoForm.menuRef}>
                                                        <button className={cardViewStyles.toggle_button_2}
                                                            onClick={() => setOpenTodoForm(old => !old)}>
                                                            <VscAdd className={cardViewStyles.icon_2} />
                                                            <div>Add Todo</div>
                                                        </button>
                                                        {openTodoForm && (
                                                            <TodoForm addTodo={addTodo} />
                                                        )}
                                                    </div>
                                                    <div ref={linkForm.menuRef}>
                                                        <button className={cardViewStyles.toggle_button_2}
                                                            onClick={() => setOpenLinkForm(old => !old)}>
                                                            <VscAdd className={cardViewStyles.icon_2} />
                                                            <div>Add Link</div>
                                                        </button>
                                                        {openLinkForm && (
                                                            <LinkForm addLink={addLink} />
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </Fragment>
                                    )}
                                    <TodoDisplay todos={data.getCard.todos as Todo[]} />
                                    <LinkDisplay links={data.getCard.links as Link[]} />
                                    <div className={cardViewStyles.messageSection}>
                                        <MessageForm addMessage={addMessage} data={message} />
                                        <MessageDisplay messages={data.getCard.messages as Message[]} />
                                    </div>
                                </div>
                            </CardContextProvider>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default CardView;