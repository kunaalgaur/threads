import { useAppDispatch } from '@/redux/hooks';
import { failure, request, success } from '@/redux/slice/profileSlice';
import { User } from '@/constants/type';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useFetchUser = (userId: string) => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const getData = async () => {
            dispatch(request());
            try {
                const res = await fetch(`/api/user/get-user/${userId}`, {
                    method: 'GET',
                });
                const response = await res.json();

                if (!res.ok) {
                    dispatch(failure(response.message));
                    toast.error(response.message);
                    throw new Error(response.message);
                }

                if (res.ok) {
                    dispatch(success());
                    setUser(response.user);
                }
            } catch (error: any) {
                toast.error(error.message);
                dispatch(failure({ message: error.message }));
                throw new Error(error.message);
            }
        };

        getData();
    }, [userId]);

    return user as User;
};
