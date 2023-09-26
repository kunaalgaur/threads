import EditUserForm from '@/components/form/EditUserForm/EditUserForm';
import React from 'react';
import styles from './page.module.css';

const page = () => {
    return (
        <div id={styles.container}>
            <span id={styles.heading}>Edit your profile</span>
            <EditUserForm />
        </div>
    );
};

export default page;
