import { useState } from 'react';
import axios from '@/lib/axios';
import { currentUserId } from '@/constants/variable';

export const useLikeThread = (
    threadId: string,
    {
        threadLikes,
        isThreadLiked,
    }: {
        threadLikes: number;
        isThreadLiked: boolean;
    }
) => {
    const [likes, setLikes] = useState<number>(threadLikes);
    const [isLiked, setIsLiked] = useState(isThreadLiked);

    const handleLike = async () => {
        try {
            setLikes(isLiked ? likes - 1 : likes + 1);
            setIsLiked(!isLiked);

            await axios.put(`/api/thread/like-thread/${threadId}`, {
                currentUserId,
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return [likes, isLiked, handleLike];
};
