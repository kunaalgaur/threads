'use client';

import { UploadButton } from '../../../utils/uploadthing';
import { useOnboarding } from '@/hooks/API calls/PUT/useOnboarding';
import styles from './OnboardingForm.module.css';
import { useAppSelector } from '@/redux/hooks';
import ReactLoading from 'react-loading';
import React, { useState } from 'react';
import '@uploadthing/react/styles.css';
import Image from 'next/image';

const OnboardingForm = () => {
    const [image, setImage] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);

    const { loading } = useAppSelector((state) => state.onboarding);

    const handleOnboarding = useOnboarding({
        image: image as string,
        username: username as string,
        bio: bio as string,
    });

    return (
        <form action="" id={styles.container} onSubmit={handleOnboarding}>
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
