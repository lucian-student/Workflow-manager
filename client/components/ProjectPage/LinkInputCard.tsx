import React, { useEffect, useContext, useState } from 'react';
import { LinkInput } from '../../generated/apolloComponents';
import { BsLink45Deg } from 'react-icons/bs';
import linkInputCardStyles from './LinkInputCard/LinkInputCard.module.css';
import LinkInputOptions from './LinkInputOptions';
import { CardAddContext } from '../../context/cardAdd';
import LinkEditForm from './LinkEditForm';
import update from 'immutability-helper';

interface Props {
    link: LinkInput
    index: number
}

function LinkInputCard({ link, index }: Props): JSX.Element {

    const [editing, setEditing] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const { setOpenLinkOptions, setLinks, links } = useContext(CardAddContext);

    useEffect(() => {
        if (open || editing) {
            setOpenLinkOptions(true);
        } else {
            setOpenLinkOptions(false);
        }
    }, [open, editing]);

    function editLink(data: LinkInput) {
        setEditing(false);
        setLinks(update(links, {
            [index]: {
                $set: data
            }
        }));
    }

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
                    <LinkInputOptions setEditing={setEditing} index={index} open={open} setOpen={setOpen} />
                </div>
            </div>
            {editing && (
                <LinkEditForm setOpen={setEditing} link={link} editLink={editLink} />
            )}
        </div>
    )
}

export default LinkInputCard;