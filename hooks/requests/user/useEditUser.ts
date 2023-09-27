import axios from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import {
    EDIT_USER_FAILURE,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
} from '@/redux/reducers/user/edit-user-reducer';
import toast from 'react-hot-toast';

export const useEditUser = (
    userId: string,
    {
        currentUserId,
        image,
        name,
        bio,
    }: { currentUserId: string; image: string; name: string; bio: string }
) => {
    const dispatch = useAppDispatch();
    const handleUpdateUser = async () => {
        dispatch(EDIT_USER_REQUEST());
        await axios
            .put(`/api/user/edit-user/${userId}`, {
                currentUserId,
                image,
                name,
                bio,
            })
            .then((res) => {
                dispatch(EDIT_USER_SUCCESS());
                const response = res.data;
                toast.success(response.message);
            })
            .catch((error: any) => {
                dispatch(EDIT_USER_FAILURE(error.message));
                toast.error(error.message);
                throw new Error(error.message);
            });
    };

    return handleUpdateUser;
};
