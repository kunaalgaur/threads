'use client';

import { useAppSelector } from '@/redux/hooks';
import { useSignup } from '@/hooks/API calls/POST/useSignup';
import styles from './SignupForm.module.css';
import ReactLoading from 'react-loading';
import { useState } from 'react';

const SignupForm = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    const [password, setPassword] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();

    const { loading } = useAppSelector((state) => state.signup);

    const handleSignup = useSignup({
        name: name as string,
        email: email as string,
        password: password as string,
    });

    return (
        <form action="" id={styles.container} onSubmit={handleSignup}>
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
                    <ReactLoading
                        type="spin"
                        color="black"
                        height={20}
                        width={20}
                    />
                ) : (
                    'Sign up'
                )}
            </button>
        </form>
    );
};

export default SignupForm;
