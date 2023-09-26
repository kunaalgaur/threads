import toast from 'react-hot-toast';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';

export const useVerifyToken = (token: string) => {
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    useEffect(() => {
        const verifyToken = () => {
            axios
                .post('/api/auth/verify-token', { token })
                .then((res) => {
                    const response = res.data;
                    toast.success(response.message);
                    return setIsTokenVerified(true);
                })
                .catch((error) => {
                    toast.error(
                        error.response?.data?.message || 'An error occurred.'
                    );
                    return setIsTokenVerified(false);
                });
        };

        verifyToken();
    }, [token]);

    return isTokenVerified;
};
