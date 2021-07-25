import React, { useContext } from 'react';
import { ProjectContext } from '../../context/project';
import projectDataStyles from './ProjectData/ProjectData.module.css';
import { GiProgression } from 'react-icons/gi';
import { MdDateRange, MdSubtitles, MdDescription } from 'react-icons/md'
import dayjs from 'dayjs';

function ProjectData(): JSX.Element {

    const { project } = useContext(ProjectContext);

    return (
        <div className={projectDataStyles.project_data_wrapper}>
            <div className={projectDataStyles.input_wrapper}>
                <div className={projectDataStyles.form_label}>
                    <MdSubtitles className={projectDataStyles.display_icon} />
                    <label className={projectDataStyles.label}>
                        Name
                    </label>
                </div>
                <div className={projectDataStyles.text}>
                    <div>
                        {project.name}
                    </div>
                </div>
            </div>
            <div className={projectDataStyles.input_wrapper}>
                <div className={projectDataStyles.form_label}>
                    <GiProgression className={projectDataStyles.display_icon} />
                    <label className={projectDataStyles.label}>
                        Status
                    </label>
                </div>
                <div className={projectDataStyles.text}>
                    <div>
                        {`${project.status}`}
                    </div>
                </div>
            </div>
            <div className={projectDataStyles.input_wrapper}>
                <div className={projectDataStyles.form_label}>
                    <MdDateRange className={projectDataStyles.display_icon} />
                    <label className={projectDataStyles.label}>
                        Deadline
                    </label>
                </div>
                <div className={projectDataStyles.text}>
                    <div>
                        {`${dayjs(project.deadline).format('DD/MM/YYYY')}`}
                    </div>
                </div>
            </div>
            <div className={projectDataStyles.input_wrapper}>
                <div className={projectDataStyles.form_label}>
                    <MdDescription className={projectDataStyles.display_icon} />
                    <label className={projectDataStyles.label}>
                        Description
                    </label>
                </div>
                <p className={projectDataStyles.description}>
                    {project.description}
                </p>
            </div>
        </div>
    )
}

export default ProjectData;
