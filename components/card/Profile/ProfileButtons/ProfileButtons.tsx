'use client';

import Link from 'next/link';
import styles from './ProfileButtons.module.css';
import toast from 'react-hot-toast';
import { currentUserId } from '@/constants/variable';
import { useFollow } from '@/hooks/API calls/PUT/useFollow';
import { string } from 'yup';

const ProfileButtons = ({ userId }: { userId: string }) => {
    if (userId === currentUserId) {
        return (
            <div id={styles.container}>
                <Link
                    href={`/edit-profile/${userId}`}
                    className={styles.button}>
                    Edit Profile
                </Link>
                <Link href={`/settings/${userId}`} className={styles.button}>
                    Settings
                </Link>
            </div>
        );
    }

    const handleFollow = useFollow(userId, currentUserId as string);

    return (
        <div id={styles.container}>
            <button className={styles.button} onClick={handleFollow}>
                Follow
            </button>
            <button
                className={styles.button}
                onClick={() =>
                    toast.loading(
                        'The mention feature will come in comming updates.'
                    )
                }>
                Mention
            </button>
        </div>
    );
};

export default ProfileButtons;
