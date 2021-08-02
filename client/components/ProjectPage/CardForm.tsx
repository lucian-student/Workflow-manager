import React, { useContext, useState, useEffect } from 'react';
import cardFormStyles from './CardForm/CardForm.module.css';
import { useForm } from 'react-hook-form';
import { ImCancelCircle } from 'react-icons/im';
import { CardAddContext } from '../../context/cardAdd';
import { useStackingMenuCustom } from '../../hooks/useStackingMenuCustom';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { MdDateRange, MdSubtitles, MdDescription } from 'react-icons/md';
import LinkForm from './LinkForm';
import TodoForm from './TodoForm';
import { VscAdd } from 'react-icons/vsc';
import TodoInputDisplay from './TodoInputDisplay';
import LinkInputDisplay from './LinkInputDisplay';
import { MenuContext } from '../../context/menu';
import { TodoInput, LinkInput, CardInput } from '../../generated/apolloComponents';
import { useCreateCardMutation } from '../../generated/apolloComponents';
import { ProjectContext } from '../../context/project';
import update from 'immutability-helper';
import { getProjectQuery } from '../../graphql/project/query/getProject';
import CardDataForm from './CardDataForm';

function CardForm(): JSX.Element {

    const {
        setOpen,
        list: { project_id, list_id },
        setLinks,
        setTodos,
        links,
        todos,
        setOpenLinkOptions,
        setOpenTodoOptions,
        openLinkOptions,
        openTodoOptions
    } = useContext(CardAddContext);

    const closeBlock = useContext(MenuContext);

    const { project } = useContext(ProjectContext);

    const { menuRef } = useStackingMenuCustom({ setOpen });

    const [openLinkForm, setOpenLinkForm] = useState<boolean>(false);

    const linkForm = useDropdownCustom({ setOpen: setOpenLinkForm });

    const [openTodoForm, setOpenTodoForm] = useState<boolean>(false);

    const todoForm = useDropdownCustom({ setOpen: setOpenTodoForm })

    useEffect(() => {
        if (openTodoForm || openLinkForm || openLinkOptions || openTodoOptions) {
            closeBlock.setOpen(true);
        } else {
            closeBlock.setOpen(false);
        }
    }, [
        openLinkForm,
        openTodoForm,
        openLinkOptions,
        openTodoOptions
    ]);

    useEffect(() => {
        return () => {
            setLinks([]);
            setTodos([]);
            setOpenLinkOptions(false);
            setOpenTodoOptions(false);
        }
    }, []);

    function addTodo(data: TodoInput) {
        setTodos(todos => {
            return [data, ...todos]
        })

        setOpenTodoForm(false);
    }

    function addLink(data: LinkInput) {
        setLinks(links => {
            return [data, ...links]
        })
        setOpenLinkForm(false);
    }

    const [createCardMutation, options] = useCreateCardMutation({
        onError(err) {
            console.log(err)
        },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: getProjectQuery,
                variables: {
                    project_id: Number(project_id),
                    team_id: !Number(project.team_id) ? null : Number(project.team_id)
                }
            }) as any;

            proxy.writeQuery({
                query: getProjectQuery,
                data: {
                    getProject: update(data.getProject, {
                        project: {
                            lists: {
                                [project.lists.findIndex(l => Number(l.list_id) === Number(list_id))]: {
                                    cards: {
                                        $unshift: [result.data.createCard]
                                    }
                                }
                            }
                        }
                    })
                }
            });
        }
    });

    useEffect(() => {
        if (options.data) {
            setOpen(false);
        }
    }, [options.data]);

    async function createCard(data: CardInput) {

        const newCard = {
            ...data,
            todos,
            links
        }
        await createCardMutation({
            variables: {
                data: newCard,
                project_id: Number(project_id),
                list_id: Number(list_id),
                team_id: Number(project.team_id)
            }
        });
    }

    return (
        <div className={cardFormStyles.modal_bg}>
            <div ref={menuRef} className={cardFormStyles.modal}>
                <ImCancelCircle className={cardFormStyles.cancel_modal}
                    onClick={() => setOpen(false)} />
                <div className={cardFormStyles.modal_content}>
                    <CardDataForm createCard={createCard} />
                    <div className={cardFormStyles.options}>
                        <div ref={todoForm.menuRef}>
                            <button className={cardFormStyles.toggle_button}
                                onClick={() => setOpenTodoForm(old => !old)}>
                                <VscAdd className={cardFormStyles.icon} />
                                <div>Add Todo</div>
                            </button>
                            {openTodoForm && (
                                <TodoForm addTodo={addTodo} />
                            )}
                        </div>
                        <div ref={linkForm.menuRef}>
                            <button className={cardFormStyles.toggle_button}
                                onClick={() => setOpenLinkForm(old => !old)}>
                                <VscAdd className={cardFormStyles.icon} />
                                <div>Add Link</div>
                            </button>
                            {openLinkForm && (
                                <LinkForm addLink={addLink} />
                            )}
                        </div>
                    </div>
                    <TodoInputDisplay />
                    <LinkInputDisplay />
                </div>
            </div>
        </div >
    )
}

export default CardForm;