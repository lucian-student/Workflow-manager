import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { LinkInput, Link } from '../../generated/apolloComponents';
import { BsLink45Deg } from 'react-icons/bs';
import linkCardStyles from './LinkInputCard/LinkInputCard.module.css';
import Options from './Options';
import LinkEditForm from './LinkEditForm';
import { CardViewContext } from '../../context/cardView';
import { useEditLinkMutation } from '../../graphqlHooks/link/useEditLinkMutation';
import { CardContext } from '../../context/card';
import { useDeleteLinkMutation } from '../../graphqlHooks/link/useDeleteLinkMutation';

interface Props {
    link: Link
}

interface RouterProps {
    project_id?: string,
    team_id?: string
}

function LinkCard({ link }: Props): JSX.Element {

    const [editing, setEditing] = useState<boolean>(false);

    const router = useRouter();
    const { project_id, team_id }: RouterProps = router.query;

    const [open, setOpen] = useState<boolean>(false);

    const { setOpenLinkOptions } = useContext(CardViewContext);
    const { card } = useContext(CardContext);

    const { deleteLinkMutation } = useDeleteLinkMutation({
        project_id,
        team_id,
        card_id: card.card_id
    });

    async function removeLink() {
        await deleteLinkMutation({
            variables: {
                project_id: Number(project_id),
                team_id: Number(team_id),
                link_id: Number(link.link_id)
            }
        });
    }

    const { editLinkMutation } = useEditLinkMutation({
        setOpen: setEditing,
        project_id,
        team_id,
        card_id: card.card_id
    });

    async function editLink(editLink: LinkInput) {
        await editLinkMutation({
            variables: {
                data: editLink,
                project_id: Number(project_id),
                team_id: Number(team_id),
                link_id: Number(link.link_id)
            }
        });
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