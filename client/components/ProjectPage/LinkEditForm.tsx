import React from 'react';
import { LinkInput } from '../../generated/apolloComponents';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    link: LinkInput
    index: number
}

function LinkEditForm({ setOpen, link, index }: Props): JSX.Element {

    return (
        <div>

        </div>
    )
}

export default LinkEditForm;