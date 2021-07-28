import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import linkInputOptionsStyles from './LinkInputOptions/LinkInputOptions.module.css';

function LinkInputOptions(): JSX.Element {

    return (
        <div>
            <div>
                <button className={linkInputOptionsStyles.toggle_button}
                    onClick={() => { }}>
                    <BsThreeDots className={linkInputOptionsStyles.icon} />
                </button>
            </div>
        </div>
    )
}

export default LinkInputOptions;