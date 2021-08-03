import React, { useContext, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { VscAdd } from 'react-icons/vsc';
import { ImCancelCircle } from 'react-icons/im';
import cardViewStyles from './CardView/CardView.module.css';
import { useStackingMenuCustom } from '../../hooks/useStackingMenuCustom';
import { CardViewContext } from '../../context/cardView';
import { Card, CardInput, Link, LinkInput, Todo, TodoInput, useGetCardQuery } from '../../generated/apolloComponents';
import { CardContextProvider } from '../../context/card';
import { AiOutlineEdit } from 'react-icons/ai';
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
import { useEditCardMutation } from '../../graphqlHooks/useEditCardMutation';


interface Props {
    project_id?: string,
    team_id?: string
}

function CardView(): JSX.Element {

    const { role, project } = useContext(ProjectContext);

    const { setOpen, card_id } = useContext(CardViewContext);

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

    const { data, loading, error } = useGetCardQuery({
        variables: {
            project_id: Number(project_id),
            card_id: Number(card_id),
            team_id: Number(team_id)
        },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        if (editing || openLinkForm || openTodoForm) {
            blockClose.setOpen(true);
        } else {
            blockClose.setOpen(false);
        }
    }, [editing, openLinkForm, openTodoForm]);


    const { editCardMutation } = useEditCardMutation({
        project,
        project_id,
        team_id,
        card_id,
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

    async function addTodo(todo: TodoInput) {

    }


    async function addLink(link: LinkInput) {

    }

    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }

    return (
        <Fragment>
            {data && (
                <Fragment>
                    {data.getCard && (
                        <CardContextProvider card={data.getCard as Card}>
                            <div className={cardViewStyles.modal_bg}>
                                <div ref={menuRef} className={cardViewStyles.modal}>
                                    <ImCancelCircle className={cardViewStyles.cancel_modal}
                                        onClick={() => setOpen(false)} />
                                    {!role ? (
                                        <button ref={editForm.toggleButtonRef} className={cardViewStyles.toggle_button}
                                            onClick={() => setEditing(old => !old)}>
                                            <AiOutlineEdit className={cardViewStyles.icon} />
                                        </button>
                                    ) : (
                                        <Fragment>
                                            {role <= 2 && (
                                                <button ref={editForm.toggleButtonRef} className={cardViewStyles.toggle_button}
                                                    onClick={() => setEditing(old => !old)}>
                                                    <AiOutlineEdit className={cardViewStyles.icon} />
                                                </button>
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
                                        <TodoDisplay todos={data.getCard.todos as Todo[]} />
                                        <LinkDisplay links={data.getCard.links as Link[]} />
                                    </div>
                                </div>
                            </div>
                        </CardContextProvider>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default CardView;