import React, { Fragment } from 'react';
import inveitsDisplayStyles from './InveitsDisplay/InveitsDisplay.module.css';
import { useGetTeamInvitationsQuery } from '../../generated/apolloComponents';
import InveitCard from './InveitCard';

function InveitsDisplay(): JSX.Element {

    const { data, error, loading } = useGetTeamInvitationsQuery({
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
                <div className={inveitsDisplayStyles.inveits_display}>
                    {data.getTeamInvitations.cons.map((invitation) => (
                        <InveitCard key={invitation.con_id} invitation={invitation} />
                    ))}
                </div>
            )}
        </Fragment>
    )
}

export default InveitsDisplay;