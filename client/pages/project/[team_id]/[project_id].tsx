import React from 'react';
import { useRouter } from 'next/router';
import withAuthProject from '../../../components/hoc/withAuthProject';
import { List, Project, useGetProjectQuery } from '../../../generated/apolloComponents';
import Background from '../../../components/Layout/Background';
import projectPageStyles from '../../../pageUtils/ProjectPage/ProjectPage.module.css';
import ListDisplay from '../../../components/ProjectPage/ListDisplay';
import OptionBar from '../../../components/ProjectPage/OptionBar';
import { ProjectContextProvider } from '../../../context/project';

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
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-only'
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
                <ProjectContextProvider role={data.getProject.role} project={data.getProject.project as Project}>
                    <div className={projectPageStyles.content_wrapper}>
                        <OptionBar project={data.getProject.project as Project} />
                            <ListDisplay lists={data.getProject.project.lists as List[]}
                                project_id={data.getProject.project.project_id}
                                team_id={data.getProject.project.team_id} />
                    </div>
                </ProjectContextProvider>
            )}
        </div>
    )

}

export default withAuthProject(ProjectPage);
