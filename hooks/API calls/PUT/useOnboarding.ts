import { failure, request, success } from '@/redux/slice/onboarding-slice';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { currentUserId } from '@/constants/variable';
import toast from 'react-hot-toast';

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
        dispatch(request());

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

                    dispatch(success());

                    return router.push('/');
                })
                .catch((error: any) => {
                    dispatch(failure(error.message));

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

    return handleOnboarding;
};
