'use client';

import React from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useSingleUserPost } from '@/hooks/API calls/GET/useSingleUserPost';
import Thread from '@/components/card/Thread/Thread';

const page = () => {
    const { userId } = useParams();
    const threads = useSingleUserPost(userId as string);
    return (
        <div>
            {threads.map((thread) => {
                return <Thread post={thread} key={thread._id} />;
            })}
        </div>
    );
};

export default page;
