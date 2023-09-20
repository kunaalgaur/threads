'use client';

import React, { useState } from 'react';
import styles from './NavbarRight.module.css';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import Link from 'next/link';

const NavbarRight = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    return setToggle(!toggle);
  };

  return (
    <div onClick={handleClick} id={styles.container}>
      <HiMiniBars3BottomRight />

      <div id={styles.wrapper} style={{ display: toggle ? 'flex' : 'none' }}>
        <Link href="/about" className={styles.link}>
          About
        </Link>

        <Link href="/settings" className={styles.link}>
          Settings
        </Link>

        <span className={styles.link} id={styles.logout}>
          Log out
        </span>
      </div>
    </div>
  );
};

export default NavbarRight;
