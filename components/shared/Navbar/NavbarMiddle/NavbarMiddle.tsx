'use client';

import Link from 'next/link';
import styles from './NavbarMiddle.module.css';
import {
  HiOutlineHome,
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';
import ThreadForm from '@/components/form/ThreadForm/ThreadForm';
import { useState } from 'react';

const NavbarMiddle = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div id={styles.container}>
        <Link href="/" className={styles.link}>
          <HiOutlineHome />
        </Link>

        <Link href="/search" className={styles.link}>
          <HiOutlineMagnifyingGlass />
        </Link>

        <div className={styles.link} onClick={handleClick}>
          <HiOutlinePencilSquare />
        </div>

        <Link href="" className={styles.link}>
          <HiOutlineHeart />
        </Link>

        <Link href="" className={styles.link}>
          <HiOutlineUser />
        </Link>
      </div>
      <ThreadForm state={toggle} toggleState={handleClick} />
    </>
  );
};

export default NavbarMiddle;
