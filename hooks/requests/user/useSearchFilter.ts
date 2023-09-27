import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import {
    GET_ALL_USER_FAILURE,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
} from '@/redux/reducers/user/get-all-user-reducer';

export const useSearchFilter = (query: string) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        dispatch(GET_ALL_USER_REQUEST());
        const getAllUser = async () => {
            await axios
                .get('/api/user/get-all-user')
                .then((res) => {
                    const response = res.data;
                    dispatch(GET_ALL_USER_SUCCESS());
                    setItems(response);
                })
                .catch((error: any) => {
                    dispatch(GET_ALL_USER_FAILURE(error.message));
                    throw new Error(error.message);
                });
        };

        getAllUser();
    }, []);

    const filteredItems = items.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
    });

    return filteredItems;
};
