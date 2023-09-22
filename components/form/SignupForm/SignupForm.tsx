'use client';

import { failure, request, success } from '@/redux/slice/signupSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import toast, { Toaster } from 'react-hot-toast';
import styles from './SignupForm.module.css';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';
import { useState } from 'react';

const SignupForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [toggle, setToggle] = useState<boolean>(false);
    const [password, setPassword] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();

    const { loading } = useAppSelector((state) => state.signup);

    const handleSignup = async (e: any) => {
        // to stop the page from reloading in submitting
        e.preventDefault();

        // dispatch the signin request
        dispatch(request());

        try {
            const credentials = {
                name: name,
                email: email,
                password: password,
            };

            // making a post request
            const res = await fetch('/api/auth/sign-up', {
                method: 'POST',
                body: JSON.stringify(credentials),
            });

            const response = await res.json();

            // execute this snippet is to response is not okay
            if (!res.ok) {
                toast.error(response.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });

                return dispatch(failure(response.message));
            }

            // execute this snippet is to response is okay
            if (res.ok) {
                toast.success(response!.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });

                // push to user to the sign in page
                router.push('/sign-in');

                // initializing success reducer
                return dispatch(success());
            }
        } catch (error: any) {
            // sending error message
            toast.error(error, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 6000,
            });

            // initializing failure reducer
            dispatch(failure(error));
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
