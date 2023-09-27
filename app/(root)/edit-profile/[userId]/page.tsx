import EditUserForm from '@/components/form/EditUserForm/EditUserForm';
import React from 'react';
import styles from './page.module.css';
import { useAppSelector } from '@/redux/hooks';
import ReactLoading from 'react-loading';

const page = () => {
    const { loading } = useAppSelector((state) => state.getSingleUser);

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
        <div id={styles.container}>
            <span id={styles.heading}>Edit your profile</span>
            <EditUserForm />
        </div>
    );
};

export default page;
