import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from '@/lib/axios';
import {
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from '@/redux/reducers/user/signup-reducer';

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

        if (!isValidEmail(email)) {
            toast.error('Please enter a valid email address.', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 6000,
            });
            return;
        }

        if (!isValidPassword(password)) {
            toast.error(
                'Please enter a valid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 6000,
                }
            );
            return;
        }

        dispatch(SIGNUP_REQUEST());

        try {
            const res = await axios.post('/api/auth/sign-up', {
                name: name,
                email: email,
                password: password,
            });

            const response = await res.data;

            toast.success(response.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 6000,
            });

            dispatch(SIGNUP_SUCCESS());

            return router.push('/sign-in');
        } catch (error: any) {
            if (error.response) {
                const errorData = error.response.data;
                if (errorData && errorData.message) {
                    toast.error(errorData.message, {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                        duration: 6000,
                    });
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

            dispatch(SIGNUP_FAILURE(error.message));
            throw new Error(error);
        }
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password: string) => {
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    };

    return handleSignup;
};
