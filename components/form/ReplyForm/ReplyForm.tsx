'use client';

import { currentUserId } from '@/constants/variable';
import { useGetUser } from '@/hooks/requests/user/useGetUser';
import Image from 'next/image';
import styles from './ReplyForm.module.css';
import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import { useCreateReply } from '@/hooks/requests/reply/useCreateReply';
import ReactLoading from 'react-loading';

const ReplyForm = ({ threadId }: { threadId: string }) => {
    const user = useGetUser(currentUserId as string);

    const [body, setBody] = useState<string | null>(null);
    const handleSubmit = useCreateReply({
        threadId: threadId as string,
        userId: currentUserId as string,
        body: body as string,
    });

    const { loading } = useAppSelector((state) => state.getSingleThreadReplies);

    return (
        <form action="" id={styles.container} onSubmit={handleSubmit}>
            <Image
                src={user?.image || '/User.png'}
                alt=""
                height={50}
                width={50}
                id={styles.image}
            />
            <input
                type="text"
                name="reply"
                id="reply"
                className={styles.input}
                placeholder="Write something here..."
                onChange={(e) => setBody(e.target.value)}
            />
            <button id={styles.button} type="submit">
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
        </form>
    );
};

export default ReplyForm;
