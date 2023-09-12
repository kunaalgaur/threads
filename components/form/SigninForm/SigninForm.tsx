'use client';

import { signinValidations } from '@/lib/validations/signinValidations';
import styles from './SigninForm.module.css';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { failure, request, success } from '@/redux/signinSlice';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';

const SigninForm = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState(null);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: signinValidations,
    onSubmit: async () => {
      dispatch(request());
      try {
        const response = await fetch('/api/auth/sign-in', {
          method: 'POST',
          body: JSON.stringify({
            email: formik.values.email,
            password: formik.values.password,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();

          if (responseData.data) {
            dispatch(
              success({
                userId: responseData.data.userId,
                token: responseData.data.token,
              })
            );

            // Saving data in browser local storage
            localStorage.setItem('userId', responseData.data.userId);
            localStorage.setItem('token', responseData.data.token);
          }

          // Check is the user is onboarded or not
          // If user is onboarder then navigate to '/'
          if (responseData.data.username) {
            return router.push('/');
          }

          // Navigate to '/onboarding' if not onboarded
          return router.push('/onboarding');
        }
      } catch (error: any) {
        console.error(error);
        failure(error);
      }
    },
  });

  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <form action="" id={styles.container} onSubmit={formik.handleSubmit}>
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
          'Sign in'
        )}
      </button>
    </form>
  );
};

export default SigninForm;
