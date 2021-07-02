import React from 'react';
import Link from 'next/link';
import menuStyles from './Menu/Menu.module.css';

function Menu(): JSX.Element {

    return (
        <div className={menuStyles.menu_wrapper}>
            <nav className={menuStyles.nav}>
                <Link href="/" >
                    <a className={menuStyles.link}>Home</a>
                </Link>
                <Link href="/login">
                    <a className={menuStyles.link}>Login</a>
                </Link>
                <Link href="/register">
                    <a className={menuStyles.link}>Register</a>
                </Link>
            </nav>
        </div>
    )
}

export default Menu;