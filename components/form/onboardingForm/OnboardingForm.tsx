'use client';

import { failure, request, success } from '@/redux/slice/onboardingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { UploadButton } from '../../../utils/uploadthing';
import styles from './OnboardingForm.module.css';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';
import React, { useState } from 'react';
import '@uploadthing/react/styles.css';
import toast from 'react-hot-toast';
import Image from 'next/image';

const OnboardingForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [image, setImage] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);

    const { loading } = useAppSelector((state) => state.onboarding);

    const userId = localStorage.getItem('userId') as string;

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const details = {
            userId: userId,
            image: image,
            username: username,
            bio: bio,
        };

        dispatch(request());

        try {
            const res = await fetch('/api/auth/onboarding', {
                method: 'PUT',
                body: JSON.stringify(details),
            });

            const response = await res.json();

            if (!res.ok) {
                return toast.error(response.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });
            }

            if (res.ok) {
                toast.success(response.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });

                router.push('/');

                return dispatch(success());
            }
        } catch (error: any) {
            toast.error(error.message);

            return dispatch(failure(error));
        }
    };

    return (
        <form action="" id={styles.container} onSubmit={handleSubmit}>
            <div className={styles.children}>
                <div id={styles.top}>
                    <label htmlFor="image" id={styles.imageLabel}>
                        <Image
                            src={image || '/user.png'}
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
                        <span className={styles.heading}>
                            Add profile picture.
                        </span>
                        <span className={styles.text}>
                            Add a touch of personality to your Threads profile
                            by uploading a picture. Let your picture speak a
                            thousand words. Go ahead, make your mark! 📸 Click
                            on the button to upload a picture.
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.children}>
                <label htmlFor="bio" className={styles.label}>
                    <span className={styles.heading}>
                        Please create a username.
                    </span>
                    <span className={styles.text}>
                        Choose a unique username that represents you on Threads.
                        Make it memorable and truly yours. Your identity, your
                        way! 🖋️
                    </span>
                    <input
                        type="text"
                        className={styles.input}
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
            </div>
            <div className={styles.children}>
                <label htmlFor="bio" className={styles.label}>
                    <span className={styles.heading}>Please add a bio.</span>
                    <span className={styles.text}>
                        Craft a captivating bio that lets others get to know you
                        better. Share your passions, interests, or simply a
                        glimpse of your personality. Your words, your world! 📝
                    </span>
                    <textarea
                        name="bio"
                        id="bio"
                        className={styles.textarea}
                        placeholder="Start writing a bio..."
                        onChange={(e) => setBio(e.target.value)}></textarea>
                </label>
            </div>
            <button type="submit" id={styles.button} disabled={loading}>
                {loading ? (
                    <ReactLoading
                        type="spin"
                        color="black"
                        height={20}
                        width={20}
                    />
                ) : (
                    'Continue'
                )}
            </button>
        </form>
    );
};

export default OnboardingForm;
