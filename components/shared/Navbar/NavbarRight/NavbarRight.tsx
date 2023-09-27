'use client';

import { useSignout } from '@/hooks/requests/user/useSignout';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import styles from './NavbarRight.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import { currentUserId } from '@/constants/variable';

const NavbarRight = () => {
    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        return setToggle(!toggle);
    };

    const handleSignout = useSignout();

    return (
        <div onClick={handleClick} id={styles.container}>
            <HiMiniBars3BottomRight />

            <div
                id={styles.wrapper}
                style={{ display: toggle ? 'flex' : 'none' }}>
                <Link href="/about" className={styles.link}>
                    About
                </Link>

                <Link
                    href={`/settings/${currentUserId}`}
                    className={styles.link}>
                    Settings
                </Link>

                <span
                    className={styles.link}
                    id={styles.logout}
                    onClick={handleSignout}>
                    Log out
                </span>
            </div>
        </div>
    );
};

export default NavbarRight;
