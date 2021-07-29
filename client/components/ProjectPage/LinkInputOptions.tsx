import React, { useContext } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import linkInputOptionsStyles from './LinkInputOptions/LinkInputOptions.module.css';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { CardAddContext } from '../../context/cardAdd';
import update from 'immutability-helper';

interface Props {
    index: number
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function LinkInputOptions({ index, setEditing, open, setOpen }: Props): JSX.Element {

    const { setOpenLinkOptions, setLinks, links } = useContext(CardAddContext);

    const { menuRef } = useDropdownCustom({ setOpen });

    function removeLink() {
        setOpenLinkOptions(false);
        setLinks(update(links, {
            $splice: [
                [index, 1]
            ]
        }));
    }

    return (
        <div className={linkInputOptionsStyles.link_input_options_wrapper}>
            <div ref={menuRef}>
                <button className={linkInputOptionsStyles.toggle_button}
                    onClick={() => { setOpen(old => !old) }}>
                    <BsThreeDots className={linkInputOptionsStyles.icon} />
                </button>
                {open && (
                    <div className={linkInputOptionsStyles.menu}>
                        <button className={linkInputOptionsStyles.menu_item}
                            onClick={() => { setOpen(false); setEditing(true) }}>
                            Edit Todo
                        </button>
                        <button className={linkInputOptionsStyles.menu_item}
                            onClick={removeLink}>
                            Remove todo
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LinkInputOptions;