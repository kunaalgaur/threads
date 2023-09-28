'use client';

import User from '@/components/card/User/User';
import { useFollowings } from '@/hooks/requests/user/useFollowings';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

const page = () => {
    const { userId } = useParams();
    const followings = useFollowings(userId as string);
    console.log(followings);
    return (
        <div id={styles.container}>
            {followings?.map((following) => {
                return <User user={following} key={following._id} />;
            })}
        </div>
    );
};

export default page;
