'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import styles from './OnboardingForm.module.css';
import { useFormik } from 'formik';
import { onboardingValidations } from '@/lib/validations/onboardingValidations';
import '@uploadthing/react/styles.css';
import { UploadButton } from '../../../utils/uploadthing';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const OnboardingForm = () => {
  const userId =
    useSelector((state: any) => state.signin.userId) ||
    localStorage.getItem('userId');

  const router = useRouter();
  const [image, setImage] = useState('/user.png');
  const formik = useFormik({
    initialValues: {
      username: '',
      bio: '',
    },
    validationSchema: onboardingValidations,
    onSubmit: async () => {
      if (userId) {
        await fetch('/api/auth/onboarding', {
          method: 'PUT',
          body: JSON.stringify({
            userId: userId as string,
            image: image,
            username: formik.values.username,
            bio: formik.values.bio,
          }),
        }).then(() => router.push('/'));
      }
    },
  });
  return (
    <form action="" id={styles.container} onSubmit={formik.handleSubmit}>
      <div className={styles.children}>
        <div id={styles.top}>
          <label htmlFor="image" id={styles.imageLabel}>
            <Image
              src={image}
              alt="User.png"
              height={100}
              width={100}
              id={styles.image}
              style={{ objectFit: 'cover' }}
            />
            <UploadButton
              className="custom-class"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res) {
                  setImage(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </label>
          <div id={styles.right}>
            <span className={styles.heading}>Add profile picture.</span>
            <span className={styles.text}>
              Add a touch of personality to your Threads profile by uploading a
              picture. Let your picture speak a thousand words. Go ahead, make
              your mark! 📸 Click on the picture to upload a picture.
            </span>
          </div>
        </div>
      </div>
      <div className={styles.children}>
        <label htmlFor="bio" className={styles.label}>
          <span className={styles.heading}>Please create a username.</span>
          <span className={styles.text}>
            Choose a unique username that represents you on Threads. Make it
            memorable and truly yours. Your identity, your way! 🖋️
          </span>
          <input
            type="text"
            className={styles.input}
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              border:
                formik.touched.username && Boolean(formik.errors.username)
                  ? '1px solid tomato'
                  : '1px solid #8080804a',
              color:
                formik.touched.username && Boolean(formik.errors.username)
                  ? 'tomato'
                  : 'white',
            }}
          />
          <span className={styles.helperText}>
            {formik.touched.username && Boolean(formik.errors.username)
              ? formik.errors.username
              : null}
          </span>
        </label>
      </div>
      <div className={styles.children}>
        <label htmlFor="bio" className={styles.label}>
          <span className={styles.heading}>Please add a bio.</span>
          <span className={styles.text}>
            Craft a captivating bio that lets others get to know you better.
            Share your passions, interests, or simply a glimpse of your
            personality. Your words, your world! 📝
          </span>
          <textarea
            name="bio"
            id="bio"
            className={styles.textarea}
            placeholder="Start writing a bio..."
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              border:
                formik.touched.bio && Boolean(formik.errors.bio)
                  ? '1px solid tomato'
                  : '1px solid #8080804a',
              color:
                formik.touched.bio && Boolean(formik.errors.bio)
                  ? 'tomato'
                  : 'white',
            }}
          ></textarea>
          <span className={styles.helperText}>
            {formik.touched.bio && Boolean(formik.errors.bio)
              ? formik.errors.bio
              : null}
          </span>
        </label>
      </div>
      <button type="submit" id={styles.button}>
        {formik.isSubmitting ? 'Loading...' : 'Continue'}
      </button>
    </form>
  );
};

export default OnboardingForm;
