import React from "react";
import footerStyles from './Footer/Footer.module.css';

function Footer(): JSX.Element {

    return (
        <div className={footerStyles.footer_wrapper}>
            <div>
                <p className={footerStyles.footer_text}>
                    ©Lucián Kučera
                </p>
            </div>
        </div>
    )
}

export default Footer;