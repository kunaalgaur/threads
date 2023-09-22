import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div id={styles.container}>
            <div id={styles.top}>
                <span>About</span>
                <span>Help</span>
                <span>Press</span>
                <span>API</span>
                <span>Jobs</span>
                <span>Privacy</span>
                <span>Terms</span>
                <span>Locations</span>
                <span>Language</span>
                <span>Meta verified</span>
                <span>Jobs</span>
            </div>
            <div id={styles.bottom}>
                <span>@2023 Meta</span>
                <span>Privacy</span>
                <span>Terms</span>
                <span>Cookies Policy</span>
            </div>
        </div>
    );
};

export default Footer;
