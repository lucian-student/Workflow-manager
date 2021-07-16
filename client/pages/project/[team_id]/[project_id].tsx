import React from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../../components/hoc/withAuth';
import { List, useGetProjectQuery } from '../../../generated/apolloComponents';
import Background from '../../../components/Layout/Background';
import { Fragment } from 'react';
import projectPageStyles from '../../../pageUtils/ProjectPage/ProjectPage.module.css';
import ListDisplay from '../../../components/ProjectPage/ListDisplay';

interface Props {
    project_id?: string,
    team_id?: string
}

function ProjectPage(): JSX.Element {

    const router = useRouter();
    const { project_id, team_id }: Props = router.query;


    const { data, loading, error } = useGetProjectQuery({
        variables: {
            project_id: Number(project_id),
            team_id: Number(team_id)
        },
        fetchPolicy: 'network-only'
    });

    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }

    return (
        <div className={projectPageStyles.project_page_wrapper}>
            <Background />
            {data && (
                <Fragment>
                    <ListDisplay lists={data.getProject.lists as List[]} />
                </Fragment>
            )}
        </div>
    )

}

export default withAuth(ProjectPage);
