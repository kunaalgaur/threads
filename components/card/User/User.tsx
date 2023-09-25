import { User } from '@/types/type';
import Link from 'next/link';
import Image from 'next/image';
import styles from './User.module.css';

const User = ({ user }: { user: User }) => {
    return (
        <Link href={`/profile/${user?._id}`} id={styles.container}>
            <Image
                src={user?.image || `/user.png`}
                alt=""
                height={50}
                width={50}
                id={styles.left}
            />

            <div id={styles.right}>
                <span id={styles.name}>{user?.name}</span>
                <span id={styles.username}>{user?.username}</span>
            </div>
        </Link>
    );
};

export default User;
