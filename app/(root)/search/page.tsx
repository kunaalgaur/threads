'use client';

import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import User from '@/components/card/User/User';
import { useSearchFilter } from '@/hooks/useSearchFilter';

const page = () => {
    const [query, setQuery] = useState<string>('');

    const filteredItems = useSearchFilter(query);

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

            <div id={styles.bottom}>
                {filteredItems.map((item: any) => {
                    return <User user={item} />;
                })}
            </div>
        </div>
    );
};

export default page;
