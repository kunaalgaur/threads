import Profile from '@/components/card/Profile/Profile';
import React from 'react';

const getUser = async () => {
    const res = await fetch('/')
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfileLayout;
