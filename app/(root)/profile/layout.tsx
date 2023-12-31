'use client';

import { useAppSelector } from '@/redux/hooks';
import Profile from '@/components/card/Profile/Profile';
import { useParams } from 'next/navigation';
import ReactLoading from 'react-loading';
import { useGetUser } from '@/hooks/requests/user/useGetUser';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useParams();
    const user = useGetUser(userId as string);
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
        <div>
            <Profile user={user} />

            <div>{children}</div>
        </div>
    );
};

export default ProfileLayout;
