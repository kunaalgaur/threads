'use client';

import Thread from '@/components/card/Thread/Thread';
import ReplyForm from '@/components/form/ReplyForm/ReplyForm';
import { useGetThread } from '@/hooks/requests/thread/useGetThread';
import { useAppSelector } from '@/redux/hooks';
import { useParams } from 'next/navigation';
import ReactLoading from 'react-loading';
import styles from './page.module.css';
import { useGetSingleThreadReplies } from '@/hooks/requests/reply/useGetSingleThreadReplies';
import { IReply } from '@/constants/type';
import Reply from '@/components/card/Reply/Reply';

const page = () => {
    const { threadId } = useParams();
    const thread = useGetThread(threadId as string);
    const replies = useGetSingleThreadReplies(threadId as string);
    const { loading } = useAppSelector((state) => state.getSingleThread);

    if (loading) {
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
            <Thread post={thread} />
            <ReplyForm threadId={threadId as string} />
            {replies.map((reply: IReply) => {
                return <Reply reply={reply} key={reply._id} />;
            })}
        </div>
    );
};

export default page;
