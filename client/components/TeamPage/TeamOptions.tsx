import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsThreeDots } from 'react-icons/bs';
import teamOptionsStyles from './TeamOptions/TeamOptions.module.css';
import { TeamContext } from '../../context/team';
import { useDropdownCustom } from '../../hooks/useDropdownMenuCustom';
import TeamView from './TeamView';
import { MenuContextProvider } from '../../context/menu';
import { useLeaveTeamMutation, useDeleteTeamMutation } from '../../generated/apolloComponents';

function TeamOptions(): JSX.Element {

    const { getRole, setDisplaying, team } = useContext(TeamContext);

    const [open, setOpen] = useState<boolean>(false);

    const [openView, setOpenView] = useState<boolean>(false);

    const { menuRef } = useDropdownCustom({ setOpen });

    const [leaveTeamMutation, leaveTeamProps] = useLeaveTeamMutation({
        onError(err) {
            console.log(err.message);
        }
    });

    function leaveTeam() {
        leaveTeamMutation({
            variables: {
                team_id: Number(team.team_id)
            }
        });
    }

    const [deleteTeamMutation, deleteTeamProps] = useDeleteTeamMutation({
        onError(err) {
            console.log(err.message);
        }
    });

    function deleteTeam() {
        deleteTeamMutation({
            variables: {
                team_id: Number(team.team_id)
            }
        });
    }

    const router = useRouter();

    useEffect(() => {
        if (deleteTeamProps.data) {
            router.replace('/teams')
        }
    }, [deleteTeamProps.data]);

    useEffect(() => {
        if (leaveTeamProps.data) {
            router.replace('/teams')
        }
    }, [leaveTeamProps.data]);

    return (
        <div className={teamOptionsStyles.team_options_wrapper}>
            <div ref={menuRef}>
                <button className={teamOptionsStyles.toggle_button}
                    onClick={() => { setOpen(old => !old) }}>
                    <BsThreeDots className={teamOptionsStyles.icon} />
                </button>
                {open && (
                    <div className={teamOptionsStyles.menu}>
                        <button className={teamOptionsStyles.menu_item}
                            onClick={() => { setOpenView(true); setOpen(false); }}>
                            View team
                        </button>
                        <div className={teamOptionsStyles.display_select}>
                            <button className={teamOptionsStyles.menu_item}
                                onClick={() => { setDisplaying('projects'); setOpen(false); }}>
                                View projects
                            </button>
                            <button className={teamOptionsStyles.menu_item}
                                onClick={() => { setDisplaying('members'); setOpen(false); }}>
                                View members
                            </button>
                        </div>
                        <button className={teamOptionsStyles.menu_item}
                            onClick={leaveTeam}>
                            Leave team
                        </button>
                        {getRole() === 1 && (
                            <button className={teamOptionsStyles.menu_item}
                                onClick={deleteTeam}>
                                Delete team
                            </button>
                        )}
                    </div>
                )}
            </div>
            {openView && (
                <MenuContextProvider>
                    <TeamView setOpen={setOpenView} />
                </MenuContextProvider>
            )}
        </div>
    )
}

export default TeamOptions;