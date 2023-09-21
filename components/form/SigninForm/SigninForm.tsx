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
    e.preventDefault();
    dispatch(request());
    try {
      setLoading(true);
      const credentials = { email: email, password: password };
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      const response = await res.json();
      if (!res.ok) {
        return toast.error(response.message);
      }
      const user = response.user;
      const token = response.token;
      console.log(user);
      if (res.ok) {
        dispatch(success({ userId: user._id, token: token }));
        toast.success(response.message);
        if (!user.username) {
          return router.push('/onboarding');
        } else {
          return router.push('/');
        }
      }
    } catch (error: any) {
      dispatch(failure(error));
      return toast.error(error.message);
    } finally {
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
