import { useEffect, useState } from 'react';

export const useSearchFilter = (query: string) => {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        const getAllUser = async () => {
            const res = await fetch('/api/user/get-all-user');
            const response = await res.json();

            if (!res.ok) {
                throw new Error('An unknown error happened.');
            }

            if (res.ok) {
                setItems(response);
            }
        };

        getAllUser();
    }, []);

    const filteredItems = items.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
    });

    return filteredItems;
};
