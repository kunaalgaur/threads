'use client';

import { failure, request, success } from '@/redux/slice/profileSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Profile from '@/components/card/Profile/Profile';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactLoading from 'react-loading';
import toast from 'react-hot-toast';
import { User } from '@/types/type';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();

    const [user, setUser] = useState<User | null>(null);

    const { loading } = useAppSelector((state) => state.profile);

    useEffect(() => {
        dispatch(request());
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/get-user/${userId}`, {
                    method: 'GET',
                });

                const response = await res.json();

                if (!res.ok) {
                    dispatch(failure(response));

                    throw new Error('An unexprected error happened');
                }

                if (res.ok) {
                    dispatch(success());

                    return setUser(response.user);
                }
            } catch (error: any) {
                toast.error(error.message);

                return dispatch(failure(error));
            }
        };
        getUser();
    }, [userId]);

    if (loading) {
        return (
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    height: 'calc(100vh - 160px)',
                }}>
                <ReactLoading
                    type="spin"
                    color="white"
                    height={50}
                    width={50}
                />
            </div>
        );
    }

    return (
        <div>
            <Profile user={user} />

            <div>{children}</div>
        </div>
    );
};

export default ProfileLayout;
