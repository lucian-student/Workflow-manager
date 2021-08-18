import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../components/hoc/withAuth';
import teamPageStyles from '../../pageUtils/TeamPage/TeamPage.module.css';
import Background from '../../components/Layout/Background';
import { Team, useGetTeamQuery } from '../../generated/apolloComponents';
import TeamOptionBar from '../../components/TeamPage/TeamOptionBar';
import { TeamContextProvider } from '../../context/team';
import { ProjectSortContextProvider } from '../../context/projectSort';
import OptionsBar from '../../components/MainAndTeamPage/OptionsBar';
import ProjectForm from '../../components/MainAndTeamPage/ProjectForm';
import ProjectDisplay from '../../components/MainAndTeamPage/ProjectDisplay';

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
                            {(displaying) => (
                                <Fragment>
                                    <TeamOptionBar team={data.getTeam as Team} />
                                    {displaying === 'projects' ? (
                                        <Fragment>
                                            <ProjectSortContextProvider>
                                                <div className={teamPageStyles.content}>
                                                    <OptionsBar team={true} />
                                                    <div className={teamPageStyles.projects_wrapper}>
                                                        <ProjectForm team_id={Number(data.getTeam.team_id)}/>
                                                        <ProjectDisplay team_id={Number(data.getTeam.team_id)}/>
                                                    </div>
                                                </div>
                                            </ProjectSortContextProvider>
                                        </Fragment>
                                    ) : displaying === 'members' && (
                                        <Fragment>
                                        </Fragment>
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