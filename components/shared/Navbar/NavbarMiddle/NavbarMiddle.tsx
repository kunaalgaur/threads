'use client';

import Link from 'next/link';
import styles from './NavbarMiddle.module.css';
import {
    HiOutlineHome,
    HiOutlineMagnifyingGlass,
    HiOutlineHeart,
    HiOutlineUser,
    HiOutlinePencilSquare,
} from 'react-icons/hi2';
import { currentUserId } from '@/constants/variable';

const NavbarMiddle = () => {
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

            <Link href="/activity" className={styles.link}>
                <HiOutlineHeart />
            </Link>

            <Link href={`/profile/${currentUserId}`} className={styles.link}>
                <HiOutlineUser />
            </Link>
        </div>
    );
};

export default NavbarMiddle;
