import React from 'react';
import styles from './page.module.css';
import ThreadForm from '@/components/form/ThreadForm/ThreadForm';

const page = () => {
  return (
    <div id={styles.container}>
      <span id={styles.heading}>Start a new thread</span>
      <div>
        <ThreadForm />
      </div>
    </div>
  );
};

export default page;
