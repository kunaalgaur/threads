'use client';

import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import { logout } from '@/redux/slice/signinSlice';
import { useAppDispatch } from '@/redux/hooks';
import styles from './NavbarRight.module.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';

const NavbarRight = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        return setToggle(!toggle);
    };

    const handleLogout = () => {
        localStorage.clear();

        router.push('/sign-in');

        console.log('Hello World');

        return dispatch(logout());
    };

    return (
        <div onClick={handleClick} id={styles.container}>
            <HiMiniBars3BottomRight />

            <div
                id={styles.wrapper}
                style={{ display: toggle ? 'flex' : 'none' }}>
                <Link href="/about" className={styles.link}>
                    About
                </Link>

                <Link href="/settings" className={styles.link}>
                    Settings
                </Link>

                <span
                    className={styles.link}
                    id={styles.logout}
                    onClick={() => handleLogout}>
                    Log out
                </span>
            </div>
        </div>
    );
};

export default NavbarRight;
