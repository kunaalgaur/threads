import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { currentUserId } from '@/constants/variable';
import toast from 'react-hot-toast';
import {
    ONBOARDING_FAILURE,
    ONBOARDING_REQUEST,
    ONBOARDING_SUCCESS,
} from '@/redux/reducers/user/onboarding-reducer';

export const useOnboarding = ({
    image,
    username,
    bio,
}: {
    image: string;
    username: string;
    bio: string;
}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleOnboarding = async (e: any) => {
        e.preventDefault();
        dispatch(ONBOARDING_REQUEST());

        if (!isValidUsername(username)) {
            toast.error('Please enter a valid username.', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 6000,
            });
            return;
        }

        if (currentUserId) {
            await axios
                .put(`/api/auth/onboarding/${currentUserId}`, {
                    image: image,
                    username: username,
                    bio: bio,
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

                    dispatch(ONBOARDING_SUCCESS());

                    return router.push('/');
                })
                .catch((error: any) => {
                    dispatch(ONBOARDING_FAILURE(error.message));

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
        }
    };

    const isValidUsername = (username: string) => {
        const usernameRegex = /^[a-z0-9_.]+$/;
        return usernameRegex.test(username);
    };

    return handleOnboarding;
};
