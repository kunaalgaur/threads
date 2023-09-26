import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export const useSingleUserPost = (userId: string) => {
    const [threads, setThreads] = useState<any[]>([]);

    useEffect(() => {
        const getThreads = async () => {
            await axios
                .get(`/api/thread/get-thread-by-single-user/${userId}`)
                .then((res) => {
                    const response = res.data;
                    return setThreads(response.threads);
                })
                .catch((error: any) => {
                    throw new Error(error.message);
                });
        };

        getThreads();
    }, [userId]);

    return threads;
};
