import { useAppDispatch } from '@/redux/hooks';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import {
    FOLLOW_USER_FAILURE,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
} from '@/redux/reducers/user/follow-user-reducer';

export const useFollow = (userId: string, friendId: string) => {
    const dispatch = useAppDispatch();
    const handleFollow = async () => {
        dispatch(FOLLOW_USER_REQUEST());
        await axios
            .put(`/api/user/follow-user/${userId}`, { friendId: friendId })
            .then((res) => {
                const response = res.data;
                toast.success(response.message);
                return dispatch(FOLLOW_USER_SUCCESS());
            })
            .catch((error) => {
                toast.error(error.message);
                dispatch(FOLLOW_USER_FAILURE(error.message));
                throw new Error(error.message);
            });
    };

    return handleFollow;
};
