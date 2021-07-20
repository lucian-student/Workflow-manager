import React from 'react';
import { useRouter } from 'next/router';
import withAuthProject from '../../../components/hoc/withAuthProject';
import { List, Project, useGetProjectQuery } from '../../../generated/apolloComponents';
import Background from '../../../components/Layout/Background';
import projectPageStyles from '../../../pageUtils/ProjectPage/ProjectPage.module.css';
import ListDisplay from '../../../components/ProjectPage/ListDisplay';
import OptionBar from '../../../components/ProjectPage/OptionBar';

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
                <div className={projectPageStyles.content_wrapper}>
                    <OptionBar project={data.getProject as Project} />
                    <ListDisplay lists={data.getProject.lists as List[]}
                        project_id={data.getProject.project_id}
                        team_id={data.getProject.team_id} />
                </div>
            )}
        </div>
    )

}

export default withAuthProject(ProjectPage);
