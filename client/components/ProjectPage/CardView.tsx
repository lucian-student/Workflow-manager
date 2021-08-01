import React, { useContext, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { ImCancelCircle } from 'react-icons/im';
import cardViewStyles from './CardView/CardView.module.css';
import { useStackingMenuCustom } from '../../hooks/useStackingMenuCustom';
import { CardViewContext } from '../../context/cardView';
import { Card, useGetCardQuery } from '../../generated/apolloComponents';
import { CardContextProvider } from '../../context/card';
import { AiOutlineEdit } from 'react-icons/ai';
import { ProjectContext } from '../../context/project';

interface Props {
    project_id?: string,
    team_id?: string
}

function CardView(): JSX.Element {

    const { role } = useContext(ProjectContext);

    const { setOpen, card_id } = useContext(CardViewContext);

    const { menuRef } = useStackingMenuCustom({ setOpen });

    const router = useRouter();
    const { project_id, team_id }: Props = router.query;

    const [editing, setEditing] = useState<boolean>(false);

    const { data, loading, error } = useGetCardQuery({
        variables: {
            project_id: Number(project_id),
            card_id: Number(card_id),
            team_id: Number(team_id)
        },
        fetchPolicy: 'network-only'
    });

    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }

    return (
        <Fragment>
            {data && (
                <Fragment>
                    {data.getCard && (
                        <CardContextProvider card={data.getCard as Card}>
                            <div className={cardViewStyles.modal_bg}>
                                <div ref={menuRef} className={cardViewStyles.modal}>
                                    <ImCancelCircle className={cardViewStyles.cancel_modal}
                                        onClick={() => setOpen(false)} />
                                    {!role ? (
                                        <button className={cardViewStyles.toggle_button}
                                            onClick={() => setEditing(old => !old)}>
                                            <AiOutlineEdit className={cardViewStyles.icon} />
                                        </button>
                                    ) : (
                                        <Fragment>
                                            {role <= 2 && (
                                                <button className={cardViewStyles.toggle_button}
                                                    onClick={() => setEditing(old => !old)}>
                                                    <AiOutlineEdit className={cardViewStyles.icon} />
                                                </button>
                                            )}
                                        </Fragment>
                                    )}
                                    <div className={cardViewStyles.modal_content}>

                                    </div>
                                </div>
                            </div>
                        </CardContextProvider>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default CardView;