import React from "react";
import optionsBarStyles from './OptionsBar/OptionsBar.module.css';
import SortMenu from "./SortMenu";
import SearchBar from "./SearchBar";
import OptionsMenu from "./OptionsMenu";

function OptionsBar(): JSX.Element {

    return (
        <div className={optionsBarStyles.options_bar_wrapper}>
            <div className={optionsBarStyles.bar_item}>
                <SortMenu />
            </div>
            <div className={optionsBarStyles.bar_item}>
                <SearchBar />
            </div>
            <div className={optionsBarStyles.bar_item}>
                <OptionsMenu />
            </div>
        </div>
    )
}

export default OptionsBar;