import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../components/hoc/withAuth';
import teamPageStyles from '../../pageUtils/TeamPage/TeamPage.module.css';
import Background from '../../components/Layout/Background';
import { useGetTeamQuery } from '../../generated/apolloComponents';

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
            <Fragment>
            </Fragment>
        )
    }

    if (error) {
        return (
            <Fragment>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {data && (
                <Fragment>
                    {data.getTeam && (
                        <div className={teamPageStyles.page_wrapper}>
                            <Background />

                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default withAuth(TeamPage);