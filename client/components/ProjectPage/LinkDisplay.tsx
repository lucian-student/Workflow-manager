import React from 'react'
import { Link } from '../../generated/apolloComponents';
import LinkCard from './LinkCard';
import linkDisplayStyles from './LinkDisplay/LinkDisplay.module.css';

interface Props {
    links: Link[]
}

function LinkDisplay({ links }: Props): JSX.Element {

    return (
        <div className={linkDisplayStyles.display_wrapper}>
            {links.map(link => (
                <LinkCard key={link.link_id} link={link} />
            ))}
        </div>
    )
}

export default LinkDisplay;