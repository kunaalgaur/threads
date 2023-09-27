'use client';

import Reply from '@/components/card/Reply/Reply';
import { IReply } from '@/constants/type';
import { useGetSingleUserReplies } from '@/hooks/requests/reply/useGetSingleUserReplies';
import { useParams } from 'next/navigation';

const page = () => {
    const { userId } = useParams();
    const replies = useGetSingleUserReplies(userId as string);
    return (
        <div>
            {replies.map((reply: IReply) => {
                return <Reply reply={reply} key={reply._id} />;
            })}
        </div>
    );
};

export default page;
