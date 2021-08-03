import React from 'react'
import { Link } from '../../generated/apolloComponents';

interface Props {
    links: Link[]
}

function LinkDisplay({ links }: Props): JSX.Element {

    return (
        <div>
            {links.map(link => (
                <div key={link.link_id}>
                    link
                </div>
            ))}
        </div>
    )
}

export default LinkDisplay;