import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import { User } from '@/constants/type';
import toast from 'react-hot-toast';
import {
    GET_SINGLE_USER_FAILURE,
    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
} from '@/redux/reducers/user/get-single-user-reducer';
import axios from '@/lib/axios';

export const useGetUser = (userId: string) => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (userId) {
            const getData = async () => {
                dispatch(GET_SINGLE_USER_REQUEST());

                await axios
                    .get(`/api/user/get-user/${userId}`)
                    .then((res) => {
                        const response = res.data;
                        setUser(response);
                        return dispatch(GET_SINGLE_USER_SUCCESS());
                    })
                    .catch((error) => {
                        dispatch(GET_SINGLE_USER_FAILURE(error.message));
                        throw new Error(error.messa);
                    });
            };

            getData();
        }
    }, [userId]);

    return user as User;
};
