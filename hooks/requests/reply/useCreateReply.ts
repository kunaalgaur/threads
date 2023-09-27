import { useAppDispatch } from '@/redux/hooks';
import axios from '@/lib/axios';
import {
    CREATE_REPLY_REQUEST,
    CREATE_REPLY_SUCCESS,
} from '@/redux/reducers/reply/create-reply-reducer';
import toast from 'react-hot-toast';
import { CREATE_THREAD_FAILURE } from '@/redux/reducers/thread/create-thread-reducer';

export const useCreateReply = ({
    threadId,
    userId,
    body,
}: {
    threadId: string;
    userId: string;
    body: string;
}) => {
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        dispatch(CREATE_REPLY_REQUEST());
        await axios
            .post('/api/reply/create-reply', {
                threadId: threadId,
                userId: userId,
                body: body,
            })
            .then((res) => {
                const response = res.data;
                toast.success(response.message);
                return dispatch(CREATE_REPLY_SUCCESS());
            })
            .catch((error) => {
                toast.error(error.message);
                dispatch(CREATE_THREAD_FAILURE(error.message));
                throw new Error(error.message);
            });
    };

    return handleSubmit;
};
