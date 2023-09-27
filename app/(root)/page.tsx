'use client';

import Thread from '@/components/card/Thread/Thread';
import { useGetThreads } from '@/hooks/requests/thread/useGetThreads';
import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import styles from './page.module.css';

const page = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const threads = useGetThreads(pageNumber);
    const { loading } = useAppSelector((state) => state.getAllThread);

    if (loading) {
        return (
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    height: 'calc(100vh - 160px)',
                }}>
                <ReactLoading
                    type="spin"
                    color="white"
                    height={50}
                    width={50}
                />
            </div>
        );
    }

    return (
        <div id={styles.top}>
            {threads.map((thread) => {
                return <Thread post={thread} key={thread._id} />;
            })}
            <div id={styles.bottom}>
                <div id={styles.buttons}>
                    <button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        className={styles.button}>
                        Prev
                    </button>
                    <div id={styles.number}>{pageNumber}</div>
                    <button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        className={styles.button}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
