import { useState } from 'react';
import { threadId } from 'worker_threads';

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
            setIsLiked(!isLiked);
            setLikes(isLiked ? likes - 1 : likes + 1);

            await fetch(`/api/thread/like-thread/${threadId}`, {
                method: 'PUT',
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return [likes, handleLike];
};
