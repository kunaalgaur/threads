'use client';

import { FaThreads } from 'react-icons/fa6';
import styles from './Navbar.module.css';
import NavbarMiddle from './NavbarMiddle/NavbarMiddle';
import NavbarRight from './NavbarRight/NavbarRight';

const Navbar = () => {
    return (
        <div id={styles.container}>
            <FaThreads />
            <NavbarMiddle />
            <NavbarRight />
        </div>
    );
};

export default Navbar;
