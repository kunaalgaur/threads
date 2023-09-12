'use client';

import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Rightbar.module.css';
import { useSelector } from 'react-redux';

const Rightbar = () => {
  const [user, setUser] = useState({} as any);

  const userId =
    useSelector((state: any) => state.signin.userId) ||
    localStorage.getItem('userId');

  useEffect(() => {
    const getUser = async () => {
      await fetch(`/api/user/get-user/${userId}`, {
        method: 'GET',
        cache: 'force-cache',
      })
        .then(async (response) => {
          if (response.ok) {
            const responseData = await response.json();
            setUser(responseData.data);
          }
        })
        .catch((error) => console.error(error));
    };

    getUser();
  }, [userId]);
  return (
    <div id={styles.container}>
      <div className={styles.children}>
        <Link href={`/profile/${userId}`} id={styles.profileLink}>
          <Image
            src={user?.image}
            alt=""
            height={50}
            width={50}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
          />
          <div id={styles.right}>
            <span className={styles.mainText}>{user?.name}</span>
            <span className={styles.subText}>{user?.username}</span>
          </div>
        </Link>
      </div>
      <div className={styles.children}>
        <span id={styles.heading}>Suggestions</span>
      </div>
      <Footer />
    </div>
  );
};

export default Rightbar;
