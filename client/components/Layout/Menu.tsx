import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import menuStyles from './Menu/Menu.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AuthContext } from '../../context/auth';
import { useLogoutMutation } from '../../generated/apolloComponents';
import { setAccessToken } from '../../utils/accessToken';
import { useApolloClient } from '@apollo/client';

function Menu(): JSX.Element {
    const apolloClient = useApolloClient();

    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    function activateLink(reference: HTMLAnchorElement) {
        if (reference) {
            const currPath = reference.href;
            if (currPath === window.location.href) {
                reference.className = [menuStyles.link, menuStyles.active_link].join(' ');
            }
        }
    }

    const [logoutMutation, { data }] = useLogoutMutation({
        onError(err) {
            console.log(err.message);
        },
        update(cache) {
            cache.reset();
        }
    });

    useEffect(() => {
        if (data) {
            const manageUser = async () => {
                await apolloClient.resetStore();
                setCurrentUser(null);
                setAccessToken('');
            }
            manageUser();
        }
    }, [data]);

    async function handleLogout() {
        await logoutMutation();
    }

    return (
        <div className={menuStyles.menu_wrapper}>
            <div className={menuStyles.pc_nav}>
                {!currentUser ? (
                    <nav className={menuStyles.nav}>
                        <Link href="/" >
                            <a ref={activateLink} className={menuStyles.link}>Welcome</a>
                        </Link>
                        <Link href="/login">
                            <a ref={activateLink} className={menuStyles.link}>Login</a>
                        </Link>
                        <Link href="/register">
                            <a ref={activateLink} className={menuStyles.link}>Register</a>
                        </Link>
                    </nav>
                ) : (
                    <nav className={menuStyles.nav}>
                        <Link href="/main" >
                            <a ref={activateLink} className={menuStyles.link}>Home</a>
                        </Link>
                        <Link href="/teams" >
                            <a ref={activateLink} className={menuStyles.link}>Teams</a>
                        </Link>
                        <button className={[menuStyles.link, menuStyles.link_button].join(' ')} onClick={handleLogout}>Logout</button>
                    </nav>
                )}
            </div>
            <div className={menuStyles.mobile_nav}>
                <nav className={menuStyles.toggle_wrapper}>
                    <button className={menuStyles.toggle_button} onClick={() => { setOpenMenu(old => !old) }}>
                        <GiHamburgerMenu className={menuStyles.hamburger_icon} />
                    </button>
                </nav>
                {openMenu && (
                    <div className={menuStyles.mobile_menu_wrapper}>
                        {!currentUser ? (
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
                        ) : (
                            <nav className={menuStyles.mobile_menu}>
                                <Link href="/main" >
                                    <a ref={activateLink} className={menuStyles.link}>Home</a>
                                </Link>
                                <Link href="/teams" >
                                    <a ref={activateLink} className={menuStyles.link}>Teams</a>
                                </Link>
                                <button className={[menuStyles.link, menuStyles.link_button].join(' ')} onClick={handleLogout}>Logout</button>
                            </nav>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Menu;