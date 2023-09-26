import { failure, request, success } from '@/redux/slice/signinSlice';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';

export const useSignin = ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSignin = async (e: any) => {
        e.preventDefault();
        dispatch(request());

        await axios
            .post('/api/auth/sign-in', {
                email,
                password,
            })
            .then((res) => {
                const response = res.data;

                const userId = response.user._id;

                localStorage.setItem('userId', userId);

                dispatch(success({ userId: userId }));

                toast.success('Logged in successfully.', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });

                const user = response.user;

                if (!user.username) {
                    return router.push('/onboarding');
                }
                return router.push('/');
            })
            .catch((error: any) => {
                dispatch(failure(error));
                toast.error(error.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });
                throw new Error(error.message);
            });
    };

    return handleSignin;
};
