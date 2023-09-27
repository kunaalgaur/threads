import axios from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import {
    updateFailure,
    updateRequest,
    updateSuccess,
} from '@/redux/slice/profile-slice';
import toast from 'react-hot-toast';

export const useUpdateUser = (
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
        dispatch(updateRequest());
        await axios
            .put(`/api/user/edit-user/${userId}`, {
                currentUserId,
                image,
                name,
                bio,
            })
            .then((res) => {
                dispatch(updateSuccess());
                const response = res.data;
                toast.success(response.message);
            })
            .catch((error: any) => {
                dispatch(updateFailure(error));
                toast.error(error.message);
                throw new Error(error.message);
            });
    };

    return handleUpdateUser;
};
