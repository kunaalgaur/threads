import Bottombar from '@/components/shared/Bottombar/Bottombar';
import Navbar from '@/components/shared/Navbar/Navbar';
import Footer from '@/components/shared/Footer/Footer';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Threads',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <div id="container">{children}</div>
            <Footer />
            <Bottombar />
        </>
    );
}
