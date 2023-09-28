import { useAppDispatch } from '@/redux/hooks';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import {
    GET_FOLLOWERS_FAILURE,
    GET_FOLLOWERS_REQUEST,
    GET_FOLLOWERS_SUCCESS,
} from '@/redux/reducers/user/get-followers-reducer';
import { follower } from '@/constants/type';

export const useFollowers = (userId: string) => {
    const dispatch = useAppDispatch();
    const [followers, setFollowers] = useState<follower[]>();

    useEffect(() => {
        const getFollowers = async () => {
            dispatch(GET_FOLLOWERS_REQUEST());
            await axios
                .get(`/api/user/followers/${userId}`)
                .then((res) => {
                    const response = res.data;
                    setFollowers(response);
                    return dispatch(GET_FOLLOWERS_SUCCESS());
                })
                .catch((error) => {
                    dispatch(GET_FOLLOWERS_FAILURE(error.message));
                    throw new Error(error.message);
                });
        };

        getFollowers();
    }, [userId]);

    return followers as follower[];
};
