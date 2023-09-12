import React from 'react';
import styles from './page.module.css';
import { HiSearch } from 'react-icons/hi';
import { useFormik } from 'formik';

const Search = () => {
  return (
    <div id={styles.container}>
      <div id={styles.top}>
        <div id={styles.topWrapper}>
          <HiSearch />
          <input
            type="text"
            placeholder="Search threads..."
            id={styles.input}
          />
        </div>
      </div>
      <div id={styles.bottom}></div>
    </div>
  );
};

export default Search;
