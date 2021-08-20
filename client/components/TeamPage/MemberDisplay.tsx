import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetTeamMembersLazyQuery, UserTeamConnection } from '../../generated/apolloComponents';
import { SortContext } from '../../context/sort';
import memberDisplayStyles from './MemberDisplay/MemberDisplay.module.css';
import MemberCard from './MemberCard';

interface RouterProps {
    team_id?: string
}

function MemberDisplay(): JSX.Element {

    const router = useRouter();
    const { team_id }: RouterProps = router.query;

    const { sortOptions } = useContext(SortContext);

    const [members, setMembers] = useState<({
        __typename?: "UserTeamConnection";
    } & Pick<UserTeamConnection, "team_id" | "con_id" | "user_id" | "username" | "confirmed" | "role">)[]>([]);

    const [getTeamMembers, { data }] = useGetTeamMembersLazyQuery({
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-only',
        variables: {
            sort_option: sortOptions.order_param + sortOptions.order,
            search: sortOptions.search,
            team_id: Number(team_id)
        },
        onError(err) {
            console.log(err);
        }
    });

    useEffect(() => {
        getTeamMembers();
    }, [sortOptions]);

    useEffect(() => {
        if (data) {
            if (data.getTeamMembers.cons) {
                setMembers(data.getTeamMembers.cons);
            }
        }
    }, [data]);

    return (
        <div className={memberDisplayStyles.member_display}>
            {members.map(member => (
               <MemberCard key={member.con_id} member={member}/>
            ))}
        </div>
    )
}

export default MemberDisplay;