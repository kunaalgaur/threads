'use client';

import { UploadButton } from '@/utils/uploadthing';
import styles from './EditUserForm.module.css';
import { useAppSelector } from '@/redux/hooks';
import { useParams } from 'next/navigation';
import ReactLoading from 'react-loading';
import React, { useState } from 'react';
import '@uploadthing/react/styles.css';
import Image from 'next/image';
import { currentUserId } from '@/constants/variable';
import { useGetUser } from '@/hooks/requests/user/useGetUser';
import { useEditUser } from '@/hooks/requests/user/useEditUser';

const EditUserForm = () => {
    const { userId } = useParams();

    const user = useGetUser(userId as string);

    const [image, setImage] = useState<string | null>(user?.image);
    const [name, setName] = useState<string>(user?.name);
    const [bio, setBio] = useState<string>(user?.bio);

    const handleUpdateUser = useEditUser(userId as string, {
        currentUserId: currentUserId as string,
        image: image as string,
        name: name as string,
        bio: bio as string,
    });

    const { loading } = useAppSelector((state) => state.editUser);

    return (
        <div id={styles.container}>
            <label htmlFor="image" className={styles.label}>
                <span>Edit your Profile Picture</span>
                <Image
                    src={image || user?.image || '/user.png'}
                    alt=""
                    height={100}
                    width={100}
                    id={styles.image}
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

            <label htmlFor="name" className={styles.label}>
                <span>Edit your name</span>
                <input
                    type="text"
                    placeholder={user?.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id={styles.input}
                />
            </label>

            <label htmlFor="bio" className={styles.label}>
                <span>Edit your bio</span>
                <textarea
                    name="bio"
                    className={styles.textarea}
                    onChange={(e) => setBio(e.target.value)}>
                    {user?.bio}
                </textarea>
            </label>

            <div id={styles.buttonWrapper}>
                <button onClick={handleUpdateUser} id={styles.button}>
                    {loading ? (
                        <ReactLoading
                            type="spin"
                            color="white"
                            height={20}
                            width={20}
                        />
                    ) : (
                        'Save changes'
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditUserForm;
