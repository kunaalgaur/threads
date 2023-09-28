import { useAppDispatch } from '@/redux/hooks';
import axios from '@/lib/axios';
import {
    CREATE_THREAD_FAILURE,
    CREATE_THREAD_REQUEST,
    CREATE_THREAD_SUCCESS,
} from '@/redux/reducers/thread/create-thread-reducer';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();

    const handleSubmit = async () => {
        dispatch(CREATE_THREAD_REQUEST());
        if (!image && !caption) {
            toast.error('Cannot upload an empty thread.');
            dispatch(CREATE_THREAD_FAILURE('Cannot upload an empty thread.'));
        }
        await axios
            .post('/api/thread/create', {
                userId,
                image,
                caption,
            })
            .then((res) => {
                const response = res.data;
                toast.success(response.message);
                dispatch(CREATE_THREAD_SUCCESS());
                return router.push('/');
            })
            .catch((error) => {
                dispatch(CREATE_THREAD_FAILURE(error.message));
                throw new Error(error.message);
            });
    };

    return handleSubmit;
};
