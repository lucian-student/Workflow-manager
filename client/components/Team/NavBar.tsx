import React, { Fragment } from 'react';
import navBarStyles from './NavBar/NavBar.module.css';

interface Props {
    setRoute: React.Dispatch<React.SetStateAction<"teams" | "inveits">>,
    route: "teams" | "inveits"
}

function NavBar({ setRoute, route }: Props): JSX.Element {

    return (
        <div className={navBarStyles.options_bar_pc}>
            <button className={[
                navBarStyles.toggle_button,
                navBarStyles.left_menu_item_wrapper,
                route === 'teams' ? navBarStyles.active : ''
            ].join(' ')}
                onClick={() => { setRoute('teams') }}>
                Teams
            </button>
            <button className={[
                navBarStyles.toggle_button,
                navBarStyles.left_menu_item_wrapper,
                route === 'inveits' ? navBarStyles.active : ''
            ].join(' ')}
                onClick={() => { setRoute('inveits') }}>
                Inveits
            </button>
        </div>
    )
}

export default NavBar;