import Image from 'next/image';
import Link from 'next/link';
import styles from './ProfileCard.module.css';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

const ProfileCard = ({ user }: any) => {
  const userId =
    useSelector((state: any) => state.signin.userId) ||
    localStorage.getItem('userId');

  const [currentUser, setCurrentUser] = useState({} as any);

  useEffect(() => {
    if (currentUser !== user._id) {
      const getUser = async () => {
        await fetch(`/api/user/get-user/${userId}`, {
          method: 'GET',
          cache: 'force-cache',
        })
          .then(async (response) => {
            if (response.ok) {
              const responseData = await response.json();
              setCurrentUser(responseData.data);
            }
          })
          .catch((error) => console.error(error));
      };

      getUser();
    }
  }, [userId]);

  const handleFollow = async () => {};
  return (
    <div id={styles.container}>
      <div className={styles.children}>
        <div id={styles.left}>
          <span id={styles.name}>{user?.name}</span>
          <span id={styles.username}>@{user?.username}</span>
        </div>
        <Image
          src={user?.image}
          alt={user?.name}
          height={100}
          width={100}
          id={styles.image}
        />
      </div>
      <div className={styles.children}>
        <span id={styles.bio}>{user?.bio}</span>
      </div>
      <div className={styles.children}>
        <div id={styles.linkWrapper}>
          <div>
            <Image src="/user.png" alt="" height={10} width={10} />
            <Image src="/user.png" alt="" height={10} width={10} />
          </div>
          <span id={styles.text}>
            <Link
              href={`/profile/${user._id}/followers`}
              className={styles.link}
            >
              {user?.followers?.length} followers
            </Link>{' '}
            |{' '}
            <Link
              href={`/profile/${user._id}/followings`}
              className={styles.link}
            >
              {user?.followings?.length} followings
            </Link>
          </span>
        </div>
      </div>
      <div className={styles.children}>
        {userId === user?._id ? (
          <Link href={`/edit-profile/${userId}`} className={styles.button}>
            Edit Profile
          </Link>
        ) : (
          <button onClick={handleFollow} className={styles.button}>
            Follow
          </button>
        )}
        {userId === user?._id ? (
          <Link href={`/settings/${userId}`} className={styles.button}>
            Settings
          </Link>
        ) : (
          <button onClick={handleFollow} className={styles.button}>
            Mention
          </button>
        )}
      </div>
      <div className={styles.children}>
        <div className={styles.wrapper}>
          <Link href="" className={styles.link}>
            Threads
          </Link>
        </div>
        <div className={styles.wrapper}>
          <Link href="/profile/replies" className={styles.link}>
            Replies
          </Link>
        </div>
        <div className={styles.wrapper}>
          <Link href="/profile/reposts" className={styles.link}>
            Reposts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
