import SigninForm from '@/components/form/SigninForm/SigninForm';
import styles from './page.module.css';
import Link from 'next/link';
import PublicRoute from '@/components/router/PublicRoute/PublicRoute';

const page = () => {
    return (
        <PublicRoute>
            <div id={styles.container}>
                <div id={styles.wrapper}>
                    <span id={styles.heading}>Welcome back to Threads</span>
                    <span className={styles.text}>
                        Ready to dive back into engaging conversations and
                        connect with your favorite communities? Enter your
                        credentials below and let's get you back into the
                        conversation.
                    </span>
                    <SigninForm />
                    <span className={styles.text}>
                        New here ? <Link href="/sign-up">Sign up</Link>
                    </span>
                </div>
            </div>
        </PublicRoute>
    );
};

export default page;
