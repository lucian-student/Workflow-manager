import React, { useContext } from "react";
import { BsThreeDots } from 'react-icons/bs';
import listOptionsStyles from './ListOptions/ListOptions.module.css';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { CloseMenuContext } from '../../context/closeMenu';
import { List, useDeleteListMutation } from '../../generated/apolloComponents';
import { ProjectContext } from '../../context/project';
import { CardAddContext } from '../../context/cardAdd';
import deleteListUpdate from '../../subscriptionUpdates/list/deleteListUpdate';

interface Props {
    list: List,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ListOptions({ list, open, setOpen }: Props): JSX.Element {

    const { setEditing } = useContext(CloseMenuContext);

    const cardForm = useContext(CardAddContext);

    const { menuRef } = useDropdownCustom({ setOpen });

    const { project: { team_id } } = useContext(ProjectContext);

    const [deleteListMutation] = useDeleteListMutation({
        variables: {
            project_id: Number(list.project_id),
            list_id: Number(list.list_id),
            team_id: Number(team_id)
        },
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {
            if (team_id) {
                console.log('team_project');
                return;
            }
            deleteListUpdate(result.data.deleteList,list.project_id,proxy,team_id);
        }
    });

    async function handleDeleteList() {
        await deleteListMutation();
    }

    return (
        <div className={listOptionsStyles.list_options_wrapper} ref={menuRef}>
            <button className={listOptionsStyles.toggle_button}
                onClick={() => setOpen(old => !old)}>
                <BsThreeDots className={listOptionsStyles.icon} />
            </button>
            {open && (
                <div className={listOptionsStyles.menu}>
                    <button className={listOptionsStyles.menu_item}
                        onClick={() => { cardForm.setOpen(true); cardForm.setList(list) }}>
                        Add card
                    </button>
                    <button className={listOptionsStyles.menu_item}
                        onClick={() => { setEditing(true); setOpen(false) }}>
                        Edit list
                    </button>
                    <button className={listOptionsStyles.menu_item}
                        onClick={handleDeleteList}>
                        Delete list
                    </button>
                </div>
            )}
        </div>
    )
}

export default ListOptions