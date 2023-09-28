'use client';

import { currentUserId } from '@/constants/variable';
import { useGetUser } from '@/hooks/requests/user/useGetUser';
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';
import { useCreateThread } from '@/hooks/requests/thread/useCreateThread';
import { UploadButton } from '@/utils/uploadthing';
import ReactLoading from 'react-loading';
import { useAppSelector } from '@/redux/hooks';

const page = () => {
    const user = useGetUser(currentUserId as string);
    const [image, setImage] = useState<string | null>(null);
    const [caption, setCaption] = useState<string>('');

    const handleSubmit = useCreateThread({
        userId: currentUserId as string,
        image: image as string,
        caption: caption as string,
    });

    const { loading } = useAppSelector((state) => state.createThread);
    const userLoading = useAppSelector((state) => state.getSingleUser.loading);

    if (userLoading) {
        return (
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    height: 'calc(100vh - 160px)',
                }}>
                <ReactLoading
                    type="spin"
                    color="white"
                    height={50}
                    width={50}
                />
            </div>
        );
    }
    return (
        <div id={styles.container}>
            <div id={styles.top}>
                <Image
                    src={user?.image || '/user.png'}
                    height={40}
                    width={40}
                    alt=""
                    id={styles.userImage}
                />
                <span id={styles.username}>{user?.username}</span>
            </div>

            <div id={styles.middle}>
                <textarea
                    name="caption"
                    id="caption"
                    onChange={(e) => setCaption(e.target.value)}
                    className={styles.textarea}
                    placeholder="Start a thread..."></textarea>
                <div
                    id={styles.imageWrapper}
                    style={{ display: image ? 'block' : 'null' }}>
                    <Image
                        src={image || ''}
                        alt=""
                        height={0}
                        width={0}
                        style={{ height: '100%', width: '100%0' }}
                        id={styles.image}
                    />
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

                <button type="submit" id={styles.button} onClick={handleSubmit}>
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
        </div>
    );
};

export default page;
