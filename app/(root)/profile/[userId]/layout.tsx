'use client';

import Profile from '@/components/card/Profile/Profile';
import { User } from '@/types/type';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useParams();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`/api/user/get-user/${userId}`, {
                method: 'GET',
            });

            if (!res.ok) {
                throw new Error('An unexprected error happened');
            }

            if (res.ok) {
                const response = await res.json();

                return setUser(response.user);
            }
        };
        getUser();
    }, [userId]);

    return (
        <div>
            <Profile user={user} />

            <div>{children}</div>
        </div>
    );
};

export default ProfileLayout;
