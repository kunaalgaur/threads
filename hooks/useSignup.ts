import { failure, request, success } from '@/redux/slice/signupSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from '@/lib/axios';

export const useSignup = ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSignup = async (e: any) => {
        e.preventDefault();
        dispatch(request());

        await axios
            .post('/api/auth/sign-up', {
                name: name,
                email: email,
                password: password,
            })
            .then(async (res) => {
                const response = await res.data;

                toast.success(response.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });

                dispatch(success());

                return router.push('/sign-in');
            })
            .catch((error: any) => {
                toast.error(error.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });

                dispatch(failure(error));

                throw new Error(error);
            });
    };

    return handleSignup;
};