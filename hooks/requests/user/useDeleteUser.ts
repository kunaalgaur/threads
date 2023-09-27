import { useAppDispatch } from '@/redux/hooks';
import axios from '@/lib/axios';
import {
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
} from '@/redux/reducers/user/delete-user-reducer';
import toast from 'react-hot-toast';
import { DELETE_THREAD_SUCCESS } from '@/redux/reducers/thread/delete-thread-reducer';
import { useSignout } from './useSignout';

export const useDeleteUser = (userId: string) => {
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        dispatch(DELETE_USER_REQUEST());
        const handleLogout = useSignout();

        await axios
            .delete(`/api/user/delete-account/${userId}`)
            .then((res) => {
                const response = res.data;
                toast.success(response.message);
                handleLogout();
                return dispatch(DELETE_THREAD_SUCCESS());
            })
            .catch((error) => {
                toast.error(error.message);
                dispatch(DELETE_USER_FAILURE(error.message));
                throw new Error(error.message);
            });
    };

    return handleDelete;
};
