import React, { Fragment } from "react";
import optionsBarStyles from './OptionsBar/OptionsBar.module.css';
import SortMenu from "./SortMenu";
import SearchBar from "./SearchBar";
import OptionsMenu from "./OptionsMenu";

interface Props {
    team: boolean
    type: 'project' | 'member'
}

function OptionsBar({ team, type }: Props): JSX.Element {

    return (
        <Fragment>
            <div className={optionsBarStyles.options_bar_pc}>
                <div className={optionsBarStyles.bar_item_left}>
                    <SortMenu type={type}/>
                </div>
                <div className={optionsBarStyles.bar_item_center}>
                    <SearchBar />
                </div>
                <div className={optionsBarStyles.bar_item_right}>
                    {!team && (
                        <OptionsMenu />
                    )}
                </div>
            </div>
            <div className={optionsBarStyles.mobile_wrapper}>
                <div className={optionsBarStyles.options_bar_mobile}>
                    <div className={optionsBarStyles.main_wrapper}>
                        <div className={optionsBarStyles.bar_item}>
                            <SearchBar />
                        </div>
                        {!team && (
                            <div className={optionsBarStyles.bar_item}>
                                <OptionsMenu />
                            </div>
                        )}
                        <div className={optionsBarStyles.bar_item}>
                            <SortMenu type={type}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default OptionsBar;