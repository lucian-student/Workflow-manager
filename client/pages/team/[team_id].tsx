import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../components/hoc/withAuth';
import teamPageStyles from '../../pageUtils/TeamPage/TeamPage.module.css';
import Background from '../../components/Layout/Background';
import { Team, useGetTeamQuery, useLastActiveTeamMutation } from '../../generated/apolloComponents';
import TeamOptionBar from '../../components/TeamPage/TeamOptionBar';
import { TeamContextProvider } from '../../context/team';
import { SortContextProvider } from '../../context/sort';
import OptionsBar from '../../components/MainAndTeamPage/OptionsBar';
import ProjectForm from '../../components/MainAndTeamPage/ProjectForm';
import ProjectDisplay from '../../components/MainAndTeamPage/ProjectDisplay';
import MemberDisplay from '../../components/TeamPage/MemberDisplay';
import InveitFormWrapper from '../../components/TeamPage/InveitFormWrapper';
import { MenuContextProvider } from '../../context/menu';

interface RouterProps {
    team_id?: string
}

function TeamPage(): JSX.Element {

    const router = useRouter();
    const { team_id }: RouterProps = router.query;

    const { data, loading, error } = useGetTeamQuery({
        variables: {
            team_id: Number(team_id)
        },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-only'
    });

    const [lastActiveTeam] = useLastActiveTeamMutation({
        variables: {
            team_id: Number(team_id)
        },
        onError(err) {
            console.log(err);
        }
    });

    useEffect(() => {
        lastActiveTeam();
    }, []);

    if (loading) {
        return (
            <div className={teamPageStyles.page_wrapper}>
                <Background />
            </div>
        )
    }

    if (error) {
        return (
            <div className={teamPageStyles.page_wrapper}>
                <Background />
            </div>
        )
    }

    return (
        <div className={teamPageStyles.page_wrapper}>
            <Background />
            {data && (
                <Fragment>
                    {data.getTeam && (
                        <TeamContextProvider team={data.getTeam as Team}>
                            {(displaying, getRole) => (
                                <Fragment>
                                    <TeamOptionBar team={data.getTeam as Team} />
                                    {displaying === 'projects' && (
                                        <SortContextProvider type='project'>
                                            <div className={teamPageStyles.content}>
                                                <OptionsBar team={true} type='project' />
                                                <div className={teamPageStyles.projects_wrapper}>
                                                    {getRole() === 1 && (
                                                        <ProjectForm team_id={Number(data.getTeam.team_id)} />
                                                    )}
                                                    <ProjectDisplay team_id={Number(data.getTeam.team_id)} />
                                                </div>
                                            </div>
                                        </SortContextProvider>
                                    )}
                                    {displaying === 'members' && (
                                        <SortContextProvider type='member'>
                                            <div className={teamPageStyles.content}>
                                                <OptionsBar team={true} type='member' />
                                                <div className={teamPageStyles.projects_wrapper}>
                                                    {getRole() === 1 && (
                                                        <MenuContextProvider>
                                                            <InveitFormWrapper team_id={Number(data.getTeam.team_id)}/>
                                                        </MenuContextProvider>
                                                    )}
                                                    <MemberDisplay />
                                                </div>
                                            </div>
                                        </SortContextProvider>
                                    )}
                                </Fragment>
                            )}
                        </TeamContextProvider>
                    )}
                </Fragment>
            )}
        </div>
    )
}

export default withAuth(TeamPage);