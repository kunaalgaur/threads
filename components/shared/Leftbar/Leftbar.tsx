'use client';

import { links } from '@/constants/links';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Leftbar.module.css';
import { SiThreads } from 'react-icons/si';
import { useSelector } from 'react-redux';

const Leftbar = () => {
  const userId =
    useSelector((state: any) => state.signin.userId) ||
    localStorage.getItem('userId');
  return (
    <div id={styles.container}>
      <SiThreads id={styles.logo} />
      <div id={styles.wrapper}>
        <Link href="/" className={styles.link}>
          <Image
            src="/home.png"
            alt="home.png"
            height={30}
            width={30}
            className={styles.linkImage}
          />
          <span className={styles.linkLabel}>Home</span>
        </Link>
        <Link href="/search" className={styles.link}>
          <Image
            src="/search.png"
            alt="search.png"
            height={30}
            width={30}
            className={styles.linkImage}
          />
          <span className={styles.linkLabel}>Home</span>
        </Link>
        <Link href="/create" className={styles.link}>
          <Image
            src="/create.png"
            alt="create.png"
            height={30}
            width={30}
            className={styles.linkImage}
          />
          <span className={styles.linkLabel}>Home</span>
        </Link>
        <Link href="/activity" className={styles.link}>
          <Image
            src="/heart.png"
            alt="heart.png"
            height={30}
            width={30}
            className={styles.linkImage}
          />
          <span className={styles.linkLabel}>Home</span>
        </Link>
        <Link href={`/profile/${userId}`} className={styles.link}>
          <Image
            src="/profile.png"
            alt="profile.png"
            height={30}
            width={30}
            className={styles.linkImage}
          />
          <span className={styles.linkLabel}>Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Leftbar;
