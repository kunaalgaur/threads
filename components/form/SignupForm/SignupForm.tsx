'use client';

import styles from './SignupForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';
import toast, { Toaster } from 'react-hot-toast';

const SignupForm = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const credentials = {
        name: name,
        email: email,
        password: password,
      };

      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const response = await res.json();

      console.log(response);

      toast.success(response!.message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        duration: 6000,
      });

      if (res.ok) {
        router.push('/sign-in');
      }
    } catch (error: any) {
      toast.error(error, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form action="" id={styles.container} onSubmit={handleSignup}>
      <Toaster position="top-center" reverseOrder={true} />
      <label htmlFor="name" className={styles.label}>
        <span className={styles.text}>Please enter your name</span>
        <input
          type="text"
          className={styles.input}
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
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
          'Sign up'
        )}
      </button>
    </form>
  );
};

export default SignupForm;
