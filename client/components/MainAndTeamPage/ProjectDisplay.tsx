import React, { useEffect, useContext, useState } from 'react';
import { Fragment } from 'react';
import { useGetProjectsLazyQuery } from '../../generated/apolloComponents';
import projectDisplayStyle from './ProjectDisplay/ProjectDisplay.module.css';
import ProjectCard from './ProjectCard';
import { SortContext } from '../../context/sort';

interface Props {
    team_id: number | null
}

function ProjectDisplay({ team_id }: Props): JSX.Element {

    const { sortOptions } = useContext(SortContext);

    const [projects, setProjects] = useState([]);

    const [getProjects, { data }] = useGetProjectsLazyQuery({
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-only',
        variables: {
            sort_option: sortOptions.order_param + sortOptions.order,
            search: sortOptions.search,
            team_id: team_id
        },
        onError(err) {
            console.log(err);
        }
    });

    useEffect(() => {
        getProjects();
    }, [sortOptions]);

    useEffect(() => {
        if (data) {
            if (data.getProjects) {
                setProjects(data.getProjects);
            }
        }
    }, [data]);


    return (
        <Fragment>
            {projects && (
                <div className={projectDisplayStyle.projects_card}>
                    {projects.map(project => (
                        <ProjectCard key={project.project_id} project={{
                            project_id: Number(project.project_id),
                            name: project.name,
                            deadline: Date.parse(project.deadline),
                            last_updated: Date.parse(project.last_updated),
                            status: project.status,
                            description: project.description,
                            user_id: project.user_id ? Number(project.user_id) : null,
                            team_id: project.team_id ? Number(project.team_id) : null,
                            team_name: project.team_name ? project.team_name : null
                        }} />
                    ))}
                </div>
            )}
        </Fragment>
    )
}

export default ProjectDisplay;