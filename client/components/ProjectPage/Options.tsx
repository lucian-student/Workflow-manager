import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import optionsStyles from './Options/Options.module.css';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { Fragment } from 'react';

interface Props {
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    remove: () => void | Promise<void>
    type: 'todo' | 'link'
}

function Options({ type, setEditing, open, setOpen, remove }: Props): JSX.Element {

    const { menuRef } = useDropdownCustom({ setOpen });

    return (
        <div className={optionsStyles.todo_input_options_wrapper}>
            <div ref={menuRef}>
                <button className={optionsStyles.toggle_button}
                    onClick={() => { setOpen(old => !old) }}>
                    <BsThreeDots className={optionsStyles.icon} />
                </button>
                {open && (
                    <div className={optionsStyles.menu}>
                        <button className={optionsStyles.menu_item}
                            onClick={() => { setOpen(false); setEditing(true) }}>
                            {type === 'todo' && (
                                <Fragment>
                                    Edit Todo
                                </Fragment>
                            )}
                            {type === 'link' && (
                                <Fragment>
                                    Edit Link
                                </Fragment>
                            )}
                        </button>
                        <button className={optionsStyles.menu_item}
                            onClick={remove}>
                            {type === 'todo' && (
                                <Fragment>
                                    Remove Todo
                                </Fragment>
                            )}
                            {type === 'link' && (
                                <Fragment>
                                    Remove Link
                                </Fragment>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Options;