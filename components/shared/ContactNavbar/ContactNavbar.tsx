'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './ContactNavbar.module.css';

const ContactNavbar = () => {
    const { userId } = useParams();
    return (
        <div id={styles.container}>
            <Link
                href={`/followers/${userId as string}`}
                className={styles.link}>
                Followers
            </Link>
            <Link
                href={`/followings/${userId as string}`}
                className={styles.link}>
                followings
            </Link>
        </div>
    );
};

export default ContactNavbar;
