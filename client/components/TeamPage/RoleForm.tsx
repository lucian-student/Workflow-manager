import React, { useState, useEffect, useContext } from 'react';
import roleFormStyles from './RoleForm/RoleForm.module.css';
import { useForm } from 'react-hook-form';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { MenuContext } from '../../context/menu';
import { useStackingMenuCustom } from '../../hooks/useStackingMenuCustom';
import { useChangeRoleMutation, GetTeamQuery, GetTeamMembersQuery } from '../../generated/apolloComponents';
import { getTeamQuery } from '../../graphql/team/query/getTeam';
import { getTeamMembersQuery } from '../../graphql/userTeamConnections/query/getTeamMembers';
import { SortContext } from '../../context/sort';
import update from 'immutability-helper';
import RoleSelect from './RoleSelect';

interface Props {
    con_id: string
    team_id: string
    role: number
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function RoleForm({ setOpen, role, team_id, con_id }: Props): JSX.Element {

    const { handleSubmit } = useForm();

    const [currRole, setCurrRole] = useState<'Owner' | 'Admin' | 'Member' | 'unknown'>(() => {
        switch (role) {
            case 1:
                return 'Owner'
            case 2:
                return 'Admin'
            case 3:
                return 'Member'
            default:
                return 'unknown'
        }
    });

    const [openSelect, setOpenSelect] = useState<boolean>(false);

    const select = useDropdownCustom({ setOpen: setOpenSelect });

    const block = useContext(MenuContext);

    useEffect(() => {
        if (openSelect) {
            block.setOpen(true);
        } else {
            block.setOpen(false);
        }
    }, [openSelect])

    const { sortOptions } = useContext(SortContext);
    const { menuRef } = useStackingMenuCustom({ setOpen });

    const [chnageRoleMutation, { error }] = useChangeRoleMutation({
        onError(err) {
            console.log(err.message);
        },
        update(proxy, result) {
            const query = proxy.readQuery({
                query: getTeamQuery,
                variables: {
                    team_id: Number(team_id)
                }
            }) as GetTeamQuery;

            const query2 = proxy.readQuery({
                query: getTeamMembersQuery,
                variables: {
                    sort_option: sortOptions.order_param + sortOptions.order,
                    search: sortOptions.search,
                    team_id: Number(team_id)
                }
            }) as GetTeamMembersQuery;

            proxy.writeQuery({
                query: getTeamQuery,
                variables: {
                    team_id: Number(team_id)
                },
                data: update(query, {
                    getTeam: {
                        cons: {
                            $apply: cons => cons.map((con) => {
                                if (con.con_id === result.data.changeRole.con_id) {
                                    return {
                                        ...con,
                                        role: result.data.changeRole.role
                                    }
                                } else {
                                    return con;
                                }
                            })
                        }
                    }
                })
            });

            proxy.writeQuery({
                query: getTeamMembersQuery,
                variables: {
                    sort_option: sortOptions.order_param + sortOptions.order,
                    search: sortOptions.search,
                    team_id: Number(team_id)
                },
                data: update(query2, {
                    getTeamMembers: {
                        cons: {
                            $apply: cons => cons.map((con) => {
                                if (con.con_id === result.data.changeRole.con_id) {
                                    return {
                                        ...con,
                                        role: result.data.changeRole.role
                                    }
                                } else {
                                    return con;
                                }
                            })
                        }
                    }
                })
            });
        }
    });

    function changeRole() {
        if (currRole === 'unknown') {
            return;
        }

        let newRole: 1 | 2 | 3;

        switch (currRole) {
            case 'Owner':
                newRole = 1
                break;
            case 'Admin':
                newRole = 2
                break;
            case 'Member':
                newRole = 3
                break;
            default:
                return;
        }

        chnageRoleMutation({
            variables: {
                data: {
                    role: newRole
                },
                team_id: Number(team_id),
                con_id: Number(con_id)
            }
        });
    }

    return (
        <div className={roleFormStyles.form_wrapper} ref={menuRef}>
            <form onSubmit={handleSubmit(changeRole)} className={roleFormStyles.form}>
                <RoleSelect setCurrRole={setCurrRole} currRole={currRole} setOpenSelect={setOpenSelect} openSelect={openSelect} />
                <div className={roleFormStyles.form_actions}>
                    <button type='submit' className={roleFormStyles.submit_button}>
                        Save
                    </button>
                    <ImCancelCircle className={roleFormStyles.cancel_icon}
                        onClick={() => { setOpen(false); }} />
                </div>
            </form>
            {error && (
                <div className='error_message'>
                    {error.message}
                </div>
            )}
        </div>
    )
}

export default RoleForm;