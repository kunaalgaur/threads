import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useSignout = () => {
    const router = useRouter();
    const handleSignout = async () => {
        await axios
            .post('/api/auth/sign-out')
            .then((res) => {
                const response = res.data;
                toast.success(response.message);
                localStorage.clear();
                return router.push('/sign-in');
            })
            .catch((error: any) => {
                toast.error(error.message);
            });
    };

    return handleSignout;
};
