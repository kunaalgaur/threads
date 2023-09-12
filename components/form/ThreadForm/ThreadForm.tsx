'use client';

import Image from 'next/image';
import React from 'react';
import { HiOutlinePaperClip } from 'react-icons/hi';
import styles from './ThreadForm.module.css';
import { useFormik } from 'formik';
import { threadsValidations } from '@/lib/validations/threadsSchema';

const ThreadForm = () => {
  const formik = useFormik({
    initialValues: {
      caption: '',
      image: '',
      userId: '',
    },
    validationSchema: threadsValidations,
    onSubmit: async () => {
      // await createPost()
    },
  });
  return (
    <form id={styles.container}>
      <div id={styles.left}>
        <Image
          src="/user.png"
          alt=""
          height={40}
          width={40}
          id={styles.image}
        />
      </div>
      <div id={styles.right}>
        <div id={styles.rightWrapper}>
          <span id={styles.heading}>Kunal Gaur</span>
          <label htmlFor="caption" className={styles.label}>
            <textarea
              name="caption"
              id="caption"
              placeholder="Start a thread..."
              className={styles.textarea}
            ></textarea>
          </label>
          <label htmlFor="file" className={styles.label}>
            <HiOutlinePaperClip />
            <input type="file" name="file" id="file" hidden />
          </label>
          <div id={styles.bottom}>
            <span id={styles.text}>Anynone can reply</span>
            <button type="submit" id={styles.button}>
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ThreadForm;
