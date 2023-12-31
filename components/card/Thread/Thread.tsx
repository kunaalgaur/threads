import Image from 'next/image';
import styles from './Thread.module.css';
import {
    HiOutlineHeart,
    HiOutlineChatBubbleOvalLeft,
    HiOutlineArrowPathRoundedSquare,
    HiOutlinePaperAirplane,
    HiHeart,
} from 'react-icons/hi2';
import { Post } from '@/constants/type';
import moment from 'moment';
import { useLikeThread } from '@/hooks/requests/thread/useLikeThread';
import { currentUserId } from '@/constants/variable';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Thread = ({ post }: { post: Post }) => {
    const relativeTime = moment(post?.createdAt).fromNow();

    const [likes, isLiked, handleLike] = useLikeThread(post?._id, {
        threadLikes: post?.likes.length,
        isThreadLiked: post?.likes.includes(currentUserId),
    });

    const handleCopyLink = () => {
        navigator.clipboard.writeText(
            `https://threads-taupe-rho.vercel.app/thread/${post?._id}`
        );

        toast.success('Link copied to clip board.');
    };

    return (
        <div id={styles.container}>
            <div id={styles.top}>
                <Link href={`/profile/${post?.userId._id}`}>
                    <Image
                        src={post?.userId.image || '/user.png'}
                        alt=""
                        height={40}
                        width={40}
                        id={styles.userImage}
                        unoptimized
                    />
                </Link>

                <div id={styles.right}>
                    <Link
                        href={`/profile/${post?.userId._id}`}
                        id={styles.username}>
                        {post?.userId.username}
                    </Link>

                    <span id={styles.time}>{relativeTime}</span>
                </div>
            </div>

            <div id={styles.middle}>
                <Link href={`/thread/${post?._id}`} id={styles.caption}>
                    {post?.caption}
                </Link>
                <div
                    id={styles.imageWrapper}
                    style={{ display: post?.image ? 'block' : 'none' }}>
                    {post?.image && (
                        <Link href={`/thread/${post?._id}`}>
                            <Image
                                src={post?.image}
                                alt=""
                                height={0}
                                width={0}
                                style={{ height: '100%', width: '100%' }}
                                id={styles.postImage}
                                unoptimized
                            />
                        </Link>
                    )}
                </div>
            </div>

            <div id={styles.bottom}>
                <div id={styles.imageContainer}>
                    <Image src="/user.png" alt="" height={15} width={15} />

                    <Image src="/user.png" alt="" height={15} width={15} />
                </div>

                <span>{likes} likes</span>
            </div>

            <div id={styles.threadButtons}>
                <div onClick={handleLike}>
                    {isLiked ? (
                        <HiHeart style={{ color: 'tomato' }} />
                    ) : (
                        <HiOutlineHeart />
                    )}
                </div>
                <Link href={`/thread/${post?._id}`} id={styles.commentButton}>
                    <HiOutlineChatBubbleOvalLeft />
                </Link>
                <div>
                    <HiOutlineArrowPathRoundedSquare />
                </div>
                <div onClick={handleCopyLink} id={styles.copyButton}>
                    <HiOutlinePaperAirplane />
                </div>
            </div>
        </div>
    );
};

export default Thread;
