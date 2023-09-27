import { useEffect, useState } from 'react';

const useFeed = (userId: string) => {
    const [threads, setThreads] = useState<any[]>([]);

    useEffect(() => {
        const getFeed = async () => {};
        getFeed();
    });
    return threads;
};
