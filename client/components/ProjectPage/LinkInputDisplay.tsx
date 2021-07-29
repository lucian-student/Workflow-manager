import React, { useContext } from 'react';
import { CardAddContext } from '../../context/cardAdd';
import linkInputDisplay from './LinkInputDisplay/LinkInputDisplay.module.css';
import LinkInputCard from './LinkInputCard';

function LinkInputDisplay(): JSX.Element {

    const { links } = useContext(CardAddContext);

    return (
        <div className={linkInputDisplay.display_wrapper}>
            {links.map((link, index) => (
                <LinkInputCard key={index} link={link} index={index} />
            ))}
        </div>
    )
}

export default LinkInputDisplay;