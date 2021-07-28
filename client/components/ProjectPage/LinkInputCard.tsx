import React from 'react';
import { LinkInput } from '../../generated/apolloComponents';
import { BsLink45Deg } from 'react-icons/bs';
import linkInputCardStyles from './LinkInputCard/LinkInputCard.module.css';
import LinkInpututOptions from './LinkInputOptions';

interface Props {
    link: LinkInput
}

function LinkInputCard({ link }: Props): JSX.Element {

    return (
        <div className={linkInputCardStyles.link_input_card}>
            <div className={linkInputCardStyles.type_icon_wrapper}>
                <div className={linkInputCardStyles.link_background}>
                    <a href={link.url} className={linkInputCardStyles.link}>
                        <BsLink45Deg className={linkInputCardStyles.type_icon} />
                    </a>
                </div>
            </div>
            <div className={linkInputCardStyles.input_wrapper}>
                <div>
                    <div className={linkInputCardStyles.text}>
                        {link.name}
                    </div>
                </div>
                <div className={linkInputCardStyles.options_wrapper}>
                    <LinkInpututOptions />
                </div>
            </div>
        </div>
    )
}

export default LinkInputCard;