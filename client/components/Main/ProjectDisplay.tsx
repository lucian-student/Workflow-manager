import React from 'react';
import { Fragment } from 'react';
import { useGetProjectsQuery } from '../../generated/apolloComponents';
import projectDisplayStyle from './ProjectDisplay/ProjectDisplay.module.css';
import ProjectCard from './ProjectCard';


function ProjectDisplay(): JSX.Element {
    const { data, loading, error } = useGetProjectsQuery({
        fetchPolicy: 'network-only'
    });


    if (error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }

    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    }


    return (
        <Fragment>
            {data && (
                <div className={projectDisplayStyle.projects_card}>
                    {data.getProjects.map(project => (
                        <ProjectCard key={project.project_id} project={{
                            project_id: Number(project.project_id),
                            name: project.name,
                            deadline: Date.parse(project.deadline),
                            last_updated:Date.parse(project.last_updated),
                            status: project.status,
                            description: project.description,
                            user_id: project.user_id ? Number(project.user_id) : null,
                            team_id: project.team_id ? Number(project.team_id) : null
                        }} />
                    ))}
                </div>
            )}
        </Fragment>
    )
}

export default ProjectDisplay;