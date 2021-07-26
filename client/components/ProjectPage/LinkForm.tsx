import React from 'react';
import linkFormStyles from './LinkForm/LinkForm.module.css';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function LinkForm({ setOpen }: Props): JSX.Element {

    return (
        <div>
            <button className={linkFormStyles.toggle_button}
                onClick={() => setOpen(old => !old)}>
                Add Link
            </button>
        </div>
    )
}

export default LinkForm;