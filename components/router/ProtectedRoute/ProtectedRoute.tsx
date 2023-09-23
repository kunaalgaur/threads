'use client';

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const token = localStorage.getItem('token') as string;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const verifyToken = async () => {
        try {
            const res = await fetch('/api/auth/verify-token', {
                method: 'POST',
                body: JSON.stringify({ token }),
            });

            const response = await res.json();

            if (!res.ok) {
                toast.error(response.message);

                return router.push('/sign-in');
            }
        } catch (error: any) {
            return toast.error(error.message);
        }
    };

    useEffect(() => {
        verifyToken();

        if (!token) {
            return router.push('/sign-in');
        }
    }, [token]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={true} />
            {children}
        </>
    );
};

export default ProtectedRoute;
