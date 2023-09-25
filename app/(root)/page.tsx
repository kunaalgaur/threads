import Thread from '@/components/card/Thread/Thread';
import { Post } from '@/types/type';
import axios from 'axios';
import React from 'react';

let pageNumber = 1;

const getThreads = async () => {
    try {
        const res = await axios.get(
            `http://localhost:3000/api/thread/get-all-thread/?results=15&page=${pageNumber}`
        );

        return res.data;
    } catch (error: any) {
        console.log(error);
    }
};

const page = async () => {
    const threads: Post[] | undefined = await getThreads();

    const handleLike = () => {
        'use client';

        console.log('hello world');
    };

    handleLike();
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
