import { links } from '@/constants/links';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Bottombar.module.css';

const Bottombar = () => {
  return (
    <div id={styles.container}>
      {links.map((link) => {
        return (
          <Link href={link.route} className={styles.link}>
            <Image
              src={link.imageUrl}
              alt={`${link.label}.png`}
              height={30}
              width={30}
              className={styles.linkImage}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Bottombar;
