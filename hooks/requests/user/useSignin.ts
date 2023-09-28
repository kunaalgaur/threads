import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';
import {
    SIGNIN_FAILURE,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
} from '@/redux/reducers/user/signin-reducers';

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
        dispatch(SIGNIN_REQUEST());

        try {
            const res = await axios.post('/api/auth/sign-in', {
                email,
                password,
            });

            const response = res.data;
            const userId = response.user._id;

            localStorage.setItem('userId', userId);

            dispatch(SIGNIN_SUCCESS({ userId: userId }));

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
        } catch (error: any) {
            dispatch(SIGNIN_FAILURE(error.message));

            if (error.response && error.response.status === 401) {
                toast.error('This email is not registered.', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });
            } else if (error.response && error.response.status === 402) {
                toast.error(
                    'Incorrect password, please enter the correct password to continue.',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                        duration: 6000,
                    }
                );
            } else {
                toast.error('An error occurred. Please try again later.', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                });
            }

            throw new Error(error.message);
        }
    };

    return handleSignin;
};
