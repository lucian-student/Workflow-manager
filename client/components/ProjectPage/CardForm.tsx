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

function CardForm(): JSX.Element {

    const { handleSubmit, register, formState: { errors } } = useForm();

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
            closeBlock.setOpen(false);
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
                    <form className={cardFormStyles.form}
                        onSubmit={handleSubmit(createCard)}>
                        <button className={cardFormStyles.submit_button}
                            type='submit'>
                            Add card
                        </button>
                        <div className={cardFormStyles.input_wrapper}>
                            <div className={cardFormStyles.form_label}>
                                <MdSubtitles className={cardFormStyles.display_icon} />
                                <label className={cardFormStyles.label}>
                                    Name
                                </label>
                            </div>
                            <input
                                className={cardFormStyles.input}
                                name='name'
                                type='text'
                                autoComplete='off'
                                placeholder='Enter card name...'
                                {...register('name', {
                                    validate: {
                                        min_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length >= 1 },
                                        max_length: (value) => { return value.trimStart().trimEnd().replace(/\s+/g, " ").length <= 20 }
                                    }
                                })} />
                            {errors.name && errors.name.type === 'validate' && (
                                <div className='error_message'>Name is empty!</div>
                            )}
                            {errors.name && errors.name.type === 'min_length' && (
                                <div className='error_message'>Name has to be at least 1 characters long!</div>
                            )}
                            {errors.name && errors.name.type === 'max_length' && (
                                <div className='error_message'>Name cannot be longer than 20 characters!</div>
                            )}
                        </div>
                        <div className={cardFormStyles.input_wrapper}>
                            <div className={cardFormStyles.form_label}>
                                <MdDateRange className={cardFormStyles.display_icon} />
                                <label className={cardFormStyles.label}>
                                    Deadline
                                </label>
                            </div>
                            <input
                                className={cardFormStyles.input}
                                name='deadline'
                                type='date'
                                autoComplete='off'
                                placeholder='Enter cards deadline...'
                                {...register('deadline', {
                                    required: true
                                })} />
                            {errors.deadline && errors.deadline.type === 'required' && (
                                <div className='error_message'>Deadline is empty!</div>
                            )}
                        </div>
                        <div className={cardFormStyles.input_wrapper}>
                            <div className={cardFormStyles.form_label}>
                                <MdDescription className={cardFormStyles.display_icon} />
                                <label className={cardFormStyles.label}>
                                    Description
                                </label>
                            </div>
                            <textarea
                                className={[cardFormStyles.input, cardFormStyles.text_area].join(' ')}
                                name='description'
                                autoComplete='off'
                                placeholder='Enter cards description...'
                                {...register('description')} />
                        </div>
                    </form>
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