import React, { Fragment } from 'react';
import { useGetTeamsQuery } from '../../generated/apolloComponents';
import TeamDisplayStyles from './TeamDisplay/TeamDisplay.module.css';
import TeamCard from './TeamCard';

function TeamDisplay(): JSX.Element {

    const { data, error, loading } = useGetTeamsQuery({
        onError(err) {
            console.log(err.message);
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
                <div className={TeamDisplayStyles.team_display}>
                    {data.getTeams.teams.map(team => (
                        <TeamCard key={team.team_id} team={team} />
                    ))}
                </div>
            )}
        </Fragment>
    )
}

export default TeamDisplay;