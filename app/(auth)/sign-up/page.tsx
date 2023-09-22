import SignupForm from '@/components/form/SignupForm/SignupForm';
import styles from './page.module.css';
import Link from 'next/link';
import PublicRoute from '@/components/router/PublicRoute/PublicRoute';

const page = () => {
    return (
        <PublicRoute>
            <div id={styles.container}>
                <div id={styles.wrapper}>
                    <span id={styles.heading}>Welcome to Threads</span>
                    <span className={styles.text}>
                        Connect, discuss, and discover your passions with
                        like-minded individuals. Join now and start threading
                        your way to engaging conversations.
                    </span>
                    <SignupForm />
                    <span className={styles.text}>
                        Already a user ? <Link href="/sign-in">Sign in</Link>
                    </span>
                </div>
            </div>
        </PublicRoute>
    );
};

export default page;
