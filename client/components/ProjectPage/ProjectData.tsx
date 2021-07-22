import React, { useContext } from 'react';
import { ProjectContext } from '../../context/project';
import projectDataStyles from './ProjectData/ProjectData.module.css';
import { GrStatusInfo } from 'react-icons/gr';
import { MdDateRange } from 'react-icons/md';
import dayjs from 'dayjs';

function ProjectData(): JSX.Element {

    const { project } = useContext(ProjectContext);

    return (
        <div>
            <div>
                {project.name}
            </div>
            <div>
                <MdDateRange />  {`Deadline: ${dayjs(project.deadline).format('DD/MM/YYYY')}`}
            </div>
            <div>
                <GrStatusInfo /> {`Status: ${project.status}`}
            </div>
            <p style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                {project.description}
            </p>
        </div>
    )
}

export default ProjectData;
