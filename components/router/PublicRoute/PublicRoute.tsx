'use client';

import { token } from '@/constants/variable';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        if (token) {
            return router.push('/');
        }
    }, [token]);
    return <div>{children}</div>;
};

export default PublicRoute;
