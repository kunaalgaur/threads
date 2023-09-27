import { useAppDispatch } from '@/redux/hooks';
import axios from '@/lib/axios';
import {
    CREATE_THREAD_FAILURE,
    CREATE_THREAD_REQUEST,
    CREATE_THREAD_SUCCESS,
} from '@/redux/reducers/thread/create-thread-reducer';
import toast from 'react-hot-toast';

export const useCreateThread = ({
    userId,
    image,
    caption,
}: {
    userId: string;
    image: string;
    caption: string;
}) => {
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        dispatch(CREATE_THREAD_REQUEST());
        await axios
            .post('/api/thread/create', {
                userId,
                image,
                caption,
            })
            .then((res) => {
                const response = res.data;
                toast.success(response.message);
                return dispatch(CREATE_THREAD_SUCCESS());
            })
            .catch((error) => {
                dispatch(CREATE_THREAD_FAILURE(error.message));
                throw new Error(error.message);
            });
    };

    return handleSubmit;
};