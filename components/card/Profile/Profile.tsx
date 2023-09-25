import { User } from '@/types/type';
import Image from 'next/image';
import Link from 'next/link';
import ProfileButtons from './ProfileButtons/ProfileButtons';
import styles from './Profile.module.css';
import ProfileNavbar from './ProfileNavbar/ProfileNavbar';

const Profile = ({ user }: { user: User | null }) => {
    return (
        <div id={styles.container}>
            <div id={styles.top}>
                <div id={styles.left}>
                    <span id={styles.name}>{user?.name}</span>
                    <span id={styles.username}>@{user?.username}</span>
                </div>

                <Image
                    src={(user?.image as string) || '/user.png'}
                    alt=""
                    height={100}
                    width={100}
                    id={styles.right}
                />
            </div>

            <div id={styles.bottom}>
                <span id={styles.bio}>{user?.bio}</span>
                <span>
                    <Link
                        href={`/followers/${user?._id}`}
                        id={styles.followers}>
                        {user?.followers.length} Followers
                    </Link>
                </span>
            </div>

            <ProfileButtons userId={user?._id as string} />

            <ProfileNavbar userId={user?._id as string} />
        </div>
    );
};

export default Profile;
