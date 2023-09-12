'use client';

import styles from './page.module.css';
import ProfileCard from '@/components/card/ProfileCard/ProfileCard';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({} as any);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('userId') && !localStorage.getItem('token')) {
      return router.push('/sign-in');
    }

    const getUser = async () => {
      await fetch(`/api/user/get-user/${userId}`, {
        method: 'GET',
        cache: 'force-cache',
      })
        .then(async (response) => {
          if (response.ok) {
            const responseData = await response.json();
            setUser(responseData.data);
          }
        })
        .catch((error) => console.error(error));
    };

    getUser();
  }, [userId]);

  return (
    <div id={styles.container}>
      <ProfileCard user={user} />
    </div>
  );
};

export default Profile;
