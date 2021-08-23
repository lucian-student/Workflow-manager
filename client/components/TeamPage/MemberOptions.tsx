import React, { useState, useContext } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import memberOptionStyles from './MemberOptions/MemberOptions.module.css';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import { useRemoveMemberFromTeamMutation, GetTeamQuery, GetTeamMembersQuery } from '../../generated/apolloComponents';
import { getTeamQuery } from '../../graphql/team/query/getTeam';
import { getTeamMembersQuery } from '../../graphql/userTeamConnections/query/getTeamMembers';
import { SortContext } from '../../context/sort';
import update from 'immutability-helper';
import { useEffect } from 'react';

interface Props {
    con_id: string,
    team_id: string,
    you: () => boolean,
    setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
}

function MemberOptions({ you, setOpenForm, con_id, team_id }: Props) {

    const [open, setOpen] = useState<boolean>(false);

    const { menuRef } = useDropdownCustom({ setOpen });

    const { sortOptions } = useContext(SortContext);

    const [removeMemberFromTeamMutation, { data }] = useRemoveMemberFromTeamMutation({
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

            const conIndex = query.getTeam.cons.findIndex(con => Number(con.con_id) === Number(result.data.removeMemberFromTeam));

            proxy.writeQuery({
                query: getTeamQuery,
                variables: {
                    team_id: Number(team_id)
                },
                data: update(query, {
                    getTeam: {
                        cons: {
                            $splice: [[conIndex, 1]]
                        }
                    }
                })
            });

            const conIndex2 = query2.getTeamMembers.cons.findIndex(con => Number(con.con_id) === Number(result.data.removeMemberFromTeam));

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
                            $splice: [[conIndex2, 1]]
                        }
                    }
                })
            });
        }
    });

    function removeMember() {
        removeMemberFromTeamMutation({
            variables: {
                con_id: Number(con_id),
                team_id: Number(team_id)
            }
        });
    }

    useEffect(() => {
        if (data) {
            setOpen(false);
        }
    }, [data]);

    return (
        <div className={memberOptionStyles.options_wrapper} ref={menuRef}>
            <button className={memberOptionStyles.toggle_button}
                onClick={() => { setOpen(old => !old) }}>
                <BsThreeDots className={memberOptionStyles.icon} />
            </button>
            {open && (
                <div className={memberOptionStyles.menu}>
                    <button className={memberOptionStyles.menu_item}
                        onClick={() => { setOpenForm(true); setOpen(false); }}>
                        Change role
                    </button>
                    {!you() && (
                        <button className={memberOptionStyles.menu_item}
                            onClick={() => { removeMember() }}>
                            Remove user
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default MemberOptions;