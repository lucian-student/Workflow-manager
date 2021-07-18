import React from "react";
import projectCardStyles from './ProjectCard/ProjectCard.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';

dayjs.extend(relativeTime);


interface ProjectProps {
    project: {
        project_id: number,
        name: string,
        deadline: number,
        last_updated: number,
        status: string,
        description: string,
        user_id: number | null,
        team_id: number | null,
        team_name: string | null
    }
}

function ProjectCard({ project }: ProjectProps): JSX.Element {

    return (
        <Link href={`/project/${project.team_id}/${project.project_id}`} >
            <a>
                <div className={projectCardStyles.project_card}>
                    <div className={projectCardStyles.card_header}>
                        <div className={projectCardStyles.card_text}>
                            {project.name}
                        </div >
                        <div className={projectCardStyles.card_text}>
                            {project.status}
                        </div >
                        {project.team_id && (
                            <div className={projectCardStyles.card_text}>
                                {`Team:`}
                            </div>
                        )}
                    </div>
                    <div className={projectCardStyles.card_body}>
                        <div className={projectCardStyles.card_text}>
                            {`Last updated: ${dayjs(project.last_updated).fromNow()}`}
                        </div>
                        <div className={projectCardStyles.card_text}>
                            {`Deadline: ${dayjs(project.deadline).format('DD/MM/YYYY')}`}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProjectCard;