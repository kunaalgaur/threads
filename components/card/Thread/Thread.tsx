import Image from 'next/image';
import styles from './Thread.module.css';
import {
    HiOutlineHeart,
    HiOutlineChatBubbleOvalLeft,
    HiOutlineArrowPathRoundedSquare,
    HiOutlinePaperAirplane,
} from 'react-icons/hi2';
import { Post } from '@/types/type';
import moment from 'moment';

const Thread = ({ post }: { post: Post }) => {
    const relativeTime = moment(post?.createdAt).fromNow();
    return (
        <div id={styles.container}>
            <div id={styles.top}>
                <div id={styles.left}>
                    <Image
                        src={post?.userId.image || '/user.png'}
                        alt=""
                        height={40}
                        width={40}
                        id={styles.userImage}
                    />
                </div>

                <div id={styles.right}>
                    <div id={styles.rightTop}>
                        <span id={styles.username}>
                            {post?.userId.username}
                        </span>

                        <span id={styles.time}>{relativeTime}</span>
                    </div>

                    <span id={styles.caption}>{post?.caption}</span>

                    <div id={styles.imageWrapper}>
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
            </div>

            <div id={styles.bottom}>
                <div>
                    <Image src="/user.png" alt="" height={15} width={15} />

                    <Image src="/user.png" alt="" height={15} width={15} />
                </div>
            </div>

            <div>
                <HiOutlineHeart />
                <HiOutlineChatBubbleOvalLeft />
                <HiOutlineArrowPathRoundedSquare />
                <HiOutlinePaperAirplane />
            </div>
        </div>
    );
};

export default Thread;
