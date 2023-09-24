'use client';

import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import User from '@/components/card/User/User';

const page = () => {
    const [items, setItems] = useState<any[]>([]);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch('/api/user/get-all-user');

                const response = await res.json();

                if (!res.ok) {
                    throw new Error('An unknown error happened.');
                }

                if (res.ok) {
                    return setItems(response);
                }
            } catch (error: any) {
                throw new Error(error.message);
            }
        };

        fetchItems();
    }, []);

    const filteredItems = items.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <div id={styles.container}>
            <div id={styles.top}>
                <div id={styles.wrapper}>
                    <HiOutlineMagnifyingGlass id={styles.searchIcon} />
                    <input
                        type="text"
                        name="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        id={styles.searchInput}
                        placeholder="Search something..."
                    />
                </div>
            </div>
            <div>
                {filteredItems.map((item: any) => {
                    return <User user={item} />;
                })}
            </div>
        </div>
    );
};

export default page;
