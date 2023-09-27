import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import { User } from '@/constants/type';
import toast from 'react-hot-toast';
import {
    GET_SINGLE_USER_FAILURE,
    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
} from '@/redux/reducers/user/get-single-user-reducer';

export const useFetchUser = (userId: string) => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const getData = async () => {
            dispatch(GET_SINGLE_USER_REQUEST());

            if (userId) {
                try {
                    const res = await fetch(`/api/user/get-user/${userId}`, {
                        method: 'GET',
                    });
                    const response = await res.json();

                    if (!res.ok) {
                        dispatch(GET_SINGLE_USER_FAILURE(response.message));
                        toast.error(response.message);
                        throw new Error(response.message);
                    }

                    if (res.ok) {
                        dispatch(GET_SINGLE_USER_SUCCESS());
                        setUser(response.user);
                    }
                } catch (error: any) {
                    toast.error(error.message);
                    dispatch(GET_SINGLE_USER_FAILURE(error.message));
                    throw new Error(error.message);
                }
            }
        };

        getData();
    }, [userId]);

    return user as User;
};
