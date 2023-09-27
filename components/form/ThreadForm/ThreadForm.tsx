'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { currentUserId } from '@/constants/variable';
import { UploadButton } from '@/utils/uploadthing';
import styles from './ThreadForm.module.css';
import { HiXMark } from 'react-icons/hi2';
import ReactLoading from 'react-loading';
import { useState } from 'react';
import Image from 'next/image';
import { useGetUser } from '@/hooks/requests/user/useGetUser';
import { useCreateThread } from '@/hooks/requests/thread/useCreateThread';

const ThreadForm = ({
    state,
    toggleState,
}: {
    state: boolean;
    toggleState: any;
}) => {
    const dispatch = useAppDispatch();

    const user = useGetUser(currentUserId as string);

    const [image, setImage] = useState<string | null>(null);
    const [caption, setCaption] = useState<string | null>(null);
    const { loading } = useAppSelector((state) => state.createThread);

    const handleSubmit = useCreateThread({
        userId: currentUserId as string,
        image: image as string,
        caption: caption as string,
    });

    return (
        <div
            id={styles.container}
            style={{ display: state ? 'block' : 'none' }}>
            <div id={styles.wrapper}>
                <div onClick={toggleState} id={styles.closeButton}>
                    <HiXMark />
                </div>

                <form method="POST" id={styles.form}>
                    <div id={styles.top}>
                        <div id={styles.left}>
                            <Image
                                src={user?.image || '/user.png'}
                                alt=""
                                height={50}
                                width={50}
                                style={{ borderRadius: '50%' }}
                            />
                        </div>

                        <div id={styles.right}>
                            <div>
                                <span id={styles.username}>
                                    @{user?.username}
                                </span>

                                <textarea
                                    name="caption"
                                    id="caption"
                                    placeholder="Start a thread..."
                                    className={styles.textarea}
                                    style={{ width: '100%' }}
                                    onChange={(e: any) =>
                                        setCaption(e.target.value)
                                    }></textarea>
                            </div>

                            {image && (
                                <div id={styles.middle}>
                                    <Image
                                        src={image}
                                        alt=""
                                        height={0}
                                        width={0}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div id={styles.bottom}>
                        <UploadButton
                            className="custom-class"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res: any) => {
                                if (res) {
                                    setImage(res[0].url);
                                }
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />

                        <button
                            type="submit"
                            id={styles.button}
                            onClick={handleSubmit}>
                            {loading ? (
                                <ReactLoading
                                    type="spin"
                                    color="white"
                                    height={20}
                                    width={20}
                                />
                            ) : (
                                'Post'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ThreadForm;
