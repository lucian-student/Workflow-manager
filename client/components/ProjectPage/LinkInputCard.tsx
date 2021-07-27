import React from 'react';
import { LinkInput } from '../../generated/apolloComponents';

interface Props {
    link: LinkInput
}

function LinkInputCard({ link }: Props): JSX.Element {

    return (
        <div>
            <div>
                {link.name}
            </div>
        </div>
    )
}

export default LinkInputCard;