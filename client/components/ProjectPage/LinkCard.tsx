import React, { useEffect, useState, useContext } from 'react';
import { LinkInput, Link } from '../../generated/apolloComponents';
import { BsLink45Deg } from 'react-icons/bs';
import linkCardStyles from './LinkInputCard/LinkInputCard.module.css';
import Options from './Options';
import LinkEditForm from './LinkEditForm';
import { CardViewContext } from '../../context/cardView';

interface Props {
    link: Link
}

function LinkCard({ link }: Props): JSX.Element {

    const [editing, setEditing] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const { setOpenLinkOptions } = useContext(CardViewContext);

    async function removeLink() {

    }

    async function editLink(editLink: LinkInput) {

    }

    useEffect(() => {
        if (open || editing) {
            setOpenLinkOptions(true);
        } else {
            setOpenLinkOptions(false);
        }
    }, [open, editing]);

    return (
        <div className={linkCardStyles.link_input_card}>
            <div className={linkCardStyles.type_icon_wrapper}>
                <div className={linkCardStyles.link_background}>
                    <a href={link.url} className={linkCardStyles.link}>
                        <BsLink45Deg className={linkCardStyles.type_icon} />
                    </a>
                </div>
            </div>
            <div className={linkCardStyles.input_wrapper}>
                <div>
                    <div className={linkCardStyles.text}>
                        {link.name}
                    </div>
                </div>
                <div className={linkCardStyles.options_wrapper}>
                    <Options type='link' setEditing={setEditing} open={open} setOpen={setOpen} remove={removeLink} />
                </div>
            </div>
            {editing && (
                <LinkEditForm setOpen={setEditing} link={link} editLink={editLink} />
            )}
        </div>
    )
}

export default LinkCard;