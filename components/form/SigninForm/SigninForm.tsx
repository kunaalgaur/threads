'use client';

import styles from './SigninForm.module.css';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { failure, request, success } from '@/redux/signinSlice';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';
import toast, { Toaster } from 'react-hot-toast';

const SigninForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [toggle, setToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = async (e: any) => {
    // to prevent to page from reloading
    e.preventDefault();

    // initialize the request reducer
    dispatch(request());

    try {
      // setting the loading state to true
      setLoading(true);

      const credentials = { email: email, password: password };

      // hitting the signin api
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const response = await res.json();

      // sending error to front end if the response is incorrect
      if (!res.ok) {
        return toast.error(response.message);
      }

      const user = response.user;
      const token = response.token;

      // saving the response in local storage
      localStorage.setItem('userId', user._id);
      localStorage.setItem('token', token);

      // implement this logic if the response is okay
      if (res.ok) {
        // initializing the success reducer if the api is fetched successfully
        dispatch(success({ userId: user._id, token: token }));

        // send a success message
        toast.success(response.message);

        // redirect the user to '/onboarding' if the user is not onboarded and to '/' is the user is onboarded
        if (!user.username) {
          return router.push('/onboarding');
        } else {
          return router.push('/');
        }
      }
    } catch (error: any) {
      // initialize the failure reducer
      dispatch(failure(error));

      // return an error message in front end
      return toast.error(error.message);
    } finally {
      // and finally set loading to false
      return setLoading(false);
    }
  };

  return (
    <form action="" id={styles.container} onSubmit={handleSubmit}>
      <Toaster position="top-center" reverseOrder={true} />
      <label htmlFor="email" className={styles.label}>
        <span className={styles.text}>Please enter your email</span>
        <input
          type="text"
          className={styles.input}
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password" className={styles.label}>
        <span className={styles.text}>Please create a Password</span>
        <input
          type={toggle ? 'text' : 'password'}
          className={styles.input}
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
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
      </label>
      <button type="submit" id={styles.button} disabled={loading}>
        {loading ? (
          <ReactLoading type="spin" color="black" height={20} width={20} />
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
};

export default SigninForm;
