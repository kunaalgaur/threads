'use client';

import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token =
    useAppSelector((state) => state.signin.token) ||
    localStorage.getItem('token');
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      return router.push('/sign-in');
    }
  }, [token]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      {children}
    </>
  );
};

export default ProtectedRoute;
