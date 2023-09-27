import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import {
    GET_ALL_THREAD_FAILURE,
    GET_ALL_THREAD_REQUEST,
    GET_ALL_THREAD_SUCCESS,
} from '@/redux/reducers/thread/get-all-thread-reducer';

export const useGetThreads = (pageNumber: number) => {
    const dispatch = useAppDispatch();
    const [threads, setThreads] = useState<any[]>([]);

    useEffect(() => {
        const getThreads = async () => {
            dispatch(GET_ALL_THREAD_REQUEST());

            await axios
                .get(`/api/thread/get-all?results=15&page=${pageNumber}`)
                .then(async (res) => {
                    const response = await res.data;
                    dispatch(GET_ALL_THREAD_SUCCESS());
                    return setThreads(response);
                })
                .catch((error: any) => {
                    dispatch(GET_ALL_THREAD_FAILURE(error.message));
                    throw new Error(error.message);
                });
        };

        getThreads();
    }, [pageNumber]);

    return threads;
};
