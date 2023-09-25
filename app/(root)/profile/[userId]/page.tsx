import React from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

// const getThread = async (userId: string) => {
//     try {
//         const res = await axios.get(
//             `http://localhost:3000/api/thread/get-thread-by-single-user/${userId}`
//         );

//         return res.data;
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// };

const page = async () => {
    // const threads = await getThread(userId as string);
    return <div>page</div>;
};

export default page;
