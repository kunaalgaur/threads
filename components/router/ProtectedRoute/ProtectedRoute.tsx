'use client';

import { useAppSelector } from '@/redux/hooks';
import { Providers } from '@/redux/providers';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAppSelector((state) => state.signin);
  const router = useRouter();

  if (!userId) {
    toast.error('Please sign in before accessing these routes.');
    router.push('/sign-in');
  }
  return (
    <Providers>
      <Toaster />
      {children}
    </Providers>
  );
};

export default ProtectedRoute;
