import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import {
    GET_SINGLE_THREAD_FAILURE,
    GET_SINGLE_THREAD_REQUEST,
    GET_SINGLE_THREAD_SUCCESS,
} from '@/redux/reducers/thread/get-single-thread-reducer';
import { GET_ALL_THREAD_REQUEST } from '@/redux/reducers/thread/get-all-thread-reducer';
import toast from 'react-hot-toast';
import { Post } from '@/constants/type';

export const useGetThread = (threadId: string) => {
    const dispatch = useAppDispatch();
    const [thread, setThread] = useState<Post | any>();

    useEffect(() => {
        const getThread = async () => {
            dispatch(GET_ALL_THREAD_REQUEST());
            await axios
                .get(`/api/thread/get-single-thread/${threadId}`)
                .then((res) => {
                    const response = res.data;
                    setThread(response);
                    dispatch(GET_SINGLE_THREAD_SUCCESS());
                })
                .catch((error) => {
                    dispatch(GET_SINGLE_THREAD_FAILURE(error.message));
                    toast.error(error.message);
                    throw new Error(error.message);
                });
        };

        getThread();
    }, [threadId]);

    return thread;
};
