'use client';

import { useFormik } from 'formik';
import styles from './SignupForm.module.css';
import { useState } from 'react';
import { signupValidations } from '@/lib/validations/signupValidations';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: signupValidations,
    onSubmit: async () => {
      await fetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify({
          name: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
        }),
      }).then(() => router.push('/sign-in'));
    },
  });
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();
  return (
    <form action="" id={styles.container} onSubmit={formik.handleSubmit}>
      <label htmlFor="name" className={styles.label}>
        <span className={styles.text}>Please enter your name</span>
        <input
          type="text"
          className={styles.input}
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            border:
              formik.touched.name && Boolean(formik.errors.name)
                ? '1px solid tomato'
                : '1px solid #8080804a',
            color:
              formik.touched.name && Boolean(formik.errors.name)
                ? 'tomato'
                : 'white',
          }}
        />
        <span className={styles.helperText}>
          {formik.touched.name && Boolean(formik.errors.name)
            ? formik.errors.name
            : null}
        </span>
      </label>
      <label htmlFor="email" className={styles.label}>
        <span className={styles.text}>Please enter your email</span>
        <input
          type="text"
          className={styles.input}
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            border:
              formik.touched.email && Boolean(formik.errors.email)
                ? '1px solid tomato'
                : '1px solid #8080804a',
            color:
              formik.touched.email && Boolean(formik.errors.email)
                ? 'tomato'
                : 'white',
          }}
        />
        <span className={styles.helperText}>
          {formik.touched.email && Boolean(formik.errors.email)
            ? formik.errors.email
            : null}
        </span>
      </label>
      <label htmlFor="password" className={styles.label}>
        <span className={styles.text}>Please create a Password</span>
        <input
          type={toggle ? 'text' : 'password'}
          className={styles.input}
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            border:
              formik.touched.password && Boolean(formik.errors.password)
                ? '1px solid tomato'
                : '1px solid #8080804a',
            color:
              formik.touched.password && Boolean(formik.errors.password)
                ? 'tomato'
                : 'white',
          }}
        />
        <label htmlFor="checkbox" id={styles.childLabel}>
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            onChange={() => setToggle(!toggle)}
          />
          <span className={styles.text}>Make password visible.</span>
        </label>
        <span className={styles.helperText}>
          {formik.touched.password && Boolean(formik.errors.password)
            ? formik.errors.password
            : null}
        </span>
      </label>
      <button type="submit" id={styles.button} disabled={formik.isSubmitting}>
        {formik.isSubmitting ? (
          <ReactLoading type="spin" color="black" height={20} width={20} />
        ) : (
          'Sign up'
        )}
      </button>
    </form>
  );
};

export default SignupForm;
