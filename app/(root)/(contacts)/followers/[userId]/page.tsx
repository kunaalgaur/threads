'use client';

import User from '@/components/card/User/User';
import { useFollowers } from '@/hooks/requests/user/useFollowers';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

const page = () => {
    const { userId } = useParams();
    const followers = useFollowers(userId as string);
    return (
        <div id={styles.container}>
            {followers?.map((follower) => {
                return <User user={follower} key={follower._id} />;
            })}
        </div>
    );
};

export default page;
