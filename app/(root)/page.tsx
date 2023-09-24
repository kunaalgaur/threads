import Thread from '@/components/card/Thread/Thread';
import { Post } from '@/types/type';
import React from 'react';

let pageNumber = 1;

const getThreads = async () => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/thread/get-all-thread/?results=15&page=${pageNumber}`
        );

        if (!res.ok) {
            throw new Error('An unknown error occurred.');
        }

        if (res.ok) {
            const data = await res.json();

            // Assuming the response contains an array of Post objects
            const threads: Post[] = data;

            return threads;
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const page = async () => {
    const threads: Post[] | undefined = await getThreads();

    console.log(threads);
    return (
        <div>
            {threads?.length === 0 ? (
                <span>There are no posts to show.</span>
            ) : (
                threads?.map((thread: Post) => {
                    return <Thread post={thread} key={thread._id} />;
                })
            )}
        </div>
    );
};

export default page;
