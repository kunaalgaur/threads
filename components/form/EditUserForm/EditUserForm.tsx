'use client';

import { useAppDispatch } from '@/redux/hooks';
import {
    failure,
    request,
    success,
    updateFailure,
    updateRequest,
} from '@/redux/slice/profileSlice';
import { UploadButton } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './EditUserForm.module.css';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

const EditUserForm = () => {
    const dispatch = useAppDispatch();

    const { userId } = useParams();

    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const getUser = async () => {
            dispatch(request());
            try {
                const res = await fetch(`/api/user/get-user/${userId}`);

                const response = await res.json();

                if (!res.ok) {
                    dispatch(failure(response));

                    throw new Error('An unexprected error happened');
                }

                if (res.ok) {
                    dispatch(success());

                    return setUser(response.user);
                }
            } catch (error: any) {
                dispatch(failure(error));
                throw new Error(error.message);
            }
        };

        getUser();
    }, [userId]);

    const [image, setImage] = useState<string | null>(user?.image || null);
    const [name, setName] = useState<string>(user?.name);
    const [bio, setBio] = useState<string>(user?.bio);

    const handleSubmit = async () => {
        dispatch(updateRequest());
        try {
            const res = await fetch(`/api/user-edit-user/${userId}`);
        } catch (error: any) {
            dispatch(updateFailure(error));

            return toast.error(error.message);
        }
    };
    return (
        <div>
            <div>
                <div>
                    <span>Edit your Profile Picture</span>
                    <Image
                        src={image || '/user.png'}
                        alt=""
                        height={80}
                        width={80}
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
                </div>

                <div>
                    <label htmlFor="">
                        <span>Edit your name</span>
                        <input
                            type="text"
                            placeholder={user?.name}
                            onChange={(e) => e.target.value}
                            id={styles.input}
                        />
                    </label>
                </div>
            </div>

            <div>
                <label htmlFor="">
                    <span>Edit your bio</span>
                    <textarea
                        name="bio"
                        id={styles.input}
                        onChange={(e) => e.target.value}>
                        {user?.bio}
                    </textarea>
                </label>
            </div>

            <div>
                <button onClick={handleSubmit}>Edit profile</button>
            </div>
        </div>
    );
};

export default EditUserForm;
