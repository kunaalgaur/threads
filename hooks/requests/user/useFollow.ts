import { useAppDispatch } from '@/redux/hooks';
import { failure, request, success } from '@/redux/slice/follow-slice';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

export const useFollow = (userId: string, friendId: string) => {
    const dispatch = useAppDispatch();
    const handleFollow = async () => {
        dispatch(request());
        await axios
            .put(`/api/user/follow-user`, {
                userId,
                friendId,
            })
            .then((res) => {
                const response = res.data;
                toast.success(response.message);
                dispatch(success());
            })
            .catch((error) => {
                toast.error(error.message);
                dispatch(failure(error.message));
                throw new Error(error.message);
            });
    };

    return handleFollow;
};
