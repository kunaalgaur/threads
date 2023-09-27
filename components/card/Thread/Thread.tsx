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

const Thread = ({ post }: { post: Post }) => {
    const relativeTime = moment(post?.createdAt).fromNow();

    const [likes, isLiked, handleLike] = useLikeThread(post?._id, {
        threadLikes: post?.likes.length,
        isThreadLiked: post?.likes.includes(currentUserId),
    });

    return (
        <div id={styles.container}>
            <div id={styles.top}>
                <Image
                    src={post?.userId.image || '/user.png'}
                    alt=""
                    height={40}
                    width={40}
                    id={styles.userImage}
                />

                <div id={styles.right}>
                    <span id={styles.username}>{post?.userId.username}</span>

                    <span id={styles.time}>{relativeTime}</span>
                </div>
            </div>

            <div id={styles.middle}>
                <span id={styles.caption}>{post?.caption}</span>
                <div
                    id={styles.imageWrapper}
                    style={{ display: post?.image ? 'block' : 'none' }}>
                    {post?.image && (
                        <Image
                            src={post?.image}
                            alt=""
                            height={0}
                            width={0}
                            style={{ height: '100%', width: '100%' }}
                            id={styles.postImage}
                        />
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
                        <HiOutlineHeart />
                    ) : (
                        <HiHeart style={{ color: 'tomato' }} />
                    )}
                </div>
                <HiOutlineChatBubbleOvalLeft />
                <HiOutlineArrowPathRoundedSquare />
                <HiOutlinePaperAirplane />
            </div>
        </div>
    );
};

export default Thread;
