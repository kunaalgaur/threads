'use client';

import Link from 'next/link';
import styles from './Bottombar.module.css';
import {
    HiOutlineHome,
    HiOutlineMagnifyingGlass,
    HiOutlineHeart,
    HiOutlineUser,
    HiOutlinePencilSquare,
} from 'react-icons/hi2';
import { useState } from 'react';
import { currentUserId } from '@/constants/variable';

const Bottombar = () => {
    return (
        <div id={styles.container}>
            <Link href="/" className={styles.link}>
                <HiOutlineHome />
            </Link>

            <Link href="/search" className={styles.link}>
                <HiOutlineMagnifyingGlass />
            </Link>

            <Link href="/thread/create" className={styles.link}>
                <HiOutlinePencilSquare />
            </Link>

            <Link href="" className={styles.link}>
                <HiOutlineHeart />
            </Link>

            <Link href={`/profile/${currentUserId}`} className={styles.link}>
                <HiOutlineUser />
            </Link>
        </div>
    );
};

export default Bottombar;
