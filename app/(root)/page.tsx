import Thread from '@/components/card/Thread/Thread';
import { Post } from '@/types/type';
import React from 'react';

let pageNumber = 1;

const getThreads = async () => {
    const res = await fetch(
        `http://localhost:3000/api/thread/get-all-thread/?results=15&page=${pageNumber}`
    );

    if (!res.ok) {
        throw new Error('An unknown error occured.');
    }

    return await res.json();
};

const page = async () => {
    const threads: string[] = await getThreads();

    console.log(threads);
    return (
        <div>
            {threads.map((thread: Post) => {
                return <Thread post={thread} />;
            })}
        </div>
    );
};

export default page;
