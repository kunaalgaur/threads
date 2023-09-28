import { useAppDispatch } from '@/redux/hooks';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import { follower } from '@/constants/type';
import {
    GET_FOLLOWINGS_FAILURE,
    GET_FOLLOWINGS_REQUEST,
    GET_FOLLOWINGS_SUCCESS,
} from '@/redux/reducers/user/get-followings-reducer';

export const useFollowings = (userId: string) => {
    const dispatch = useAppDispatch();
    const [followings, setFollowings] = useState<follower[]>();

    useEffect(() => {
        const getFollowings = async () => {
            dispatch(GET_FOLLOWINGS_REQUEST());
            await axios
                .get(`/api/user/followings/${userId}`)
                .then((res) => {
                    const response = res.data;
                    setFollowings(response);
                    return dispatch(GET_FOLLOWINGS_SUCCESS());
                })
                .catch((error) => {
                    dispatch(GET_FOLLOWINGS_FAILURE(error.message));
                    throw new Error(error.message);
                });
        };

        getFollowings();
    }, [userId]);

    return followings as follower[];
};
