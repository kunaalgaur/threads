import { IReply } from '@/constants/type';
import Image from 'next/image';
import styles from './Reply.module.css';
import { useState } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2';

const Reply = ({ reply }: { reply: IReply }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    return (
        <div id={styles.container}>
            <Image
                src={reply.userId.image || '/user.png'}
                alt=""
                height={40}
                width={40}
                id={styles.image}
            />
            <div id={styles.wrapper}>
                <span id={styles.username}>{reply?.userId.username}</span>
                <span id={styles.body}>{reply?.body}</span>
            </div>
            <div>
                <div>
                    {isLiked ? (
                        <HiHeart style={{ color: 'tomato' }} />
                    ) : (
                        <HiOutlineHeart />
                    )}
                </div>
                <span></span>
            </div>
        </div>
    );
};

export default Reply;
