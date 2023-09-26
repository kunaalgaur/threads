import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

export const useSearchFilter = (query: string) => {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        const getAllUser = async () => {
            await axios
                .get('/api/user/get-all-user')
                .then((res) => {
                    const response = res.data;
                    setItems(response);
                })
                .catch((error: any) => {
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
