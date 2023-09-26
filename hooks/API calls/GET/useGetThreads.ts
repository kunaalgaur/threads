import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { failure, request, success } from '@/redux/slice/get-all-threads-slice';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export const useGetThreads = (pageNumber: number) => {
    const dispatch = useAppDispatch();
    const [threads, setThreads] = useState<any[]>([]);

    useEffect(() => {
        const getThreads = async () => {
            dispatch(request());

            await axios
                .get(`/api/thread/get-all?results=15&page=${pageNumber}`)
                .then(async (res) => {
                    const response = await res.data;
                    dispatch(success());
                    return setThreads(response);
                })
                .catch((error: any) => {
                    dispatch(failure(error));
                    throw new Error(error.message);
                });
        };

        getThreads();
    }, [pageNumber]);

    return threads;
};
