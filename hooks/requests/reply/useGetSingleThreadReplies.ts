import { IReply } from '@/constants/type';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    GET_SINGLE_THREAD_REPLIES_FAILURE,
    GET_SINGLE_THREAD_REPLIES_REQUEST,
    GET_SINGLE_THREAD_REPLIES_SUCCESS,
} from '@/redux/reducers/reply/get-single-thread-replies-reducer';

export const useGetSingleThreadReplies = (threadId: string) => {
    const dispatch = useAppDispatch();
    const [replies, setReplies] = useState<IReply[]>([]);
    const { loading } = useAppSelector((state) => state.getSingleThreadReplies);

    useEffect(() => {
        const getSingleThreadReplies = async () => {
            dispatch(GET_SINGLE_THREAD_REPLIES_REQUEST());
            await axios
                .get(`/api/reply/get-single-thread-replies/${threadId}`)
                .then((res) => {
                    const response = res.data;
                    dispatch(GET_SINGLE_THREAD_REPLIES_SUCCESS());
                    return setReplies(response);
                })
                .catch((error) => {
                    dispatch(GET_SINGLE_THREAD_REPLIES_FAILURE(error.message));
                    throw new Error(error.message);
                });
        };

        getSingleThreadReplies();
    }, [threadId]);
    return replies;
};
