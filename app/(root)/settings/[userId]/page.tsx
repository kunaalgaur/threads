import { currentUserId } from '@/constants/variable';
import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <div>
            <span>Settings</span>
            <div>
                <span>Change you username</span>
                <span></span>
            </div>
            <div>
                <span>Change you email address</span>
            </div>
            <div>
                <span>Change password</span>
            </div>
            <div>
                <span>Switch to public account?</span>
            </div>
            <div>
                <span>Delete Account?</span>
            </div>
            <div>
                <span>Log out</span>
            </div>
        </div>
    );
};

export default page;
