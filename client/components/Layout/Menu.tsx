import React, { useState } from 'react';
import Link from 'next/link';
import menuStyles from './Menu/Menu.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
function Menu(): JSX.Element {

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    function activateLink(reference: HTMLAnchorElement) {
        if (reference) {
            const currPath = reference.href;
            if (currPath === window.location.href) {
                reference.className = [menuStyles.link, menuStyles.active_link].join(' ');
            }
        }
    }

    return (
        <div className={menuStyles.menu_wrapper}>
            <div className={menuStyles.pc_nav}>
                <nav className={menuStyles.nav}>
                    <Link href="/" >
                        <a ref={activateLink} className={menuStyles.link}>Home</a>
                    </Link>
                    <Link href="/login">
                        <a ref={activateLink} className={menuStyles.link}>Login</a>
                    </Link>
                    <Link href="/register">
                        <a ref={activateLink} className={menuStyles.link}>Register</a>
                    </Link>
                </nav>
            </div>
            <div className={menuStyles.mobile_nav}>
                <nav className={menuStyles.toggle_wrapper}>
                    <button className={menuStyles.toggle_button} onClick={() => { setOpenMenu(old => !old) }}>
                        <GiHamburgerMenu />
                    </button>
                </nav>
                {openMenu && (
                    <div className={menuStyles.mobile_menu_wrapper}>
                        <nav className={menuStyles.mobile_menu}>
                            <Link href="/" >
                                <a ref={activateLink} className={menuStyles.link}>Home</a>
                            </Link>
                            <Link href="/login">
                                <a ref={activateLink} className={menuStyles.link}>Login</a>
                            </Link>
                            <Link href="/register">
                                <a ref={activateLink} className={menuStyles.link}>Register</a>
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Menu;