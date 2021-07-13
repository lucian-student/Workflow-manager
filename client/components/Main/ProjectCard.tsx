import React from "react";
import projectCardStyles from './ProjectCard/ProjectCard.module.css';
import dayjs from 'dayjs';

interface ProjectProps {
    project: {
        project_id: number,
        name: string,
        deadline: number,
        last_updated: number,
        status: string,
        description: string,
        user_id: number,
        team_id: number
    }
}

function ProjectCard({ project }: ProjectProps): JSX.Element {

    return (
        <div className={projectCardStyles.project_card}>
            <div className={projectCardStyles.card_header}>
                {project.name}
            </div>
            <div>
                {dayjs(project.deadline).format('DD/MM/YYYY').toString()}
            </div>
        </div>
    )
}

export default ProjectCard;