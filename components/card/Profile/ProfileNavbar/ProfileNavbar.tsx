import styles from './ProfileNavbar.module.css';
import Link from 'next/link';

const ProfileNavbar = ({ userId }: { userId: string }) => {
    return (
        <div id={styles.container}>
            <Link href={`/profile/${userId}`} className={styles.link}>
                Threads
            </Link>
            <Link href={`/profile/replies/${userId}`} className={styles.link}>
                Replies
            </Link>
            <Link href={`/profile/reposts/${userId}`} className={styles.link}>
                Reposts
            </Link>
        </div>
    );
};

export default ProfileNavbar;
