'use client';

import styles from './page.module.css';

const page = () => {
    return (
        <div id={styles.container}>
            <span id={styles.heading}>Settings</span>

            <div className={styles.children}>
                <span className={styles.title}>Change you username</span>
                <span className={styles.text}>
                    you can easily change your username to reflect your unique
                    identity. Make it personal, make it yours. Let's get
                    started!
                </span>
                <label htmlFor="" className={styles.label}>
                    <span className={styles.text}>Enter your new username</span>
                    <input type="text" className={styles.input} />
                </label>
                <button className={styles.button}>Change username</button>
            </div>

            <div className={styles.children}>
                <span className={styles.title}>Change you email address</span>
                <span className={styles.text}>
                    Your email is your digital lifeline, and we're here to help
                    you keep it current. Let's make sure you stay connected.
                    Let's begin!
                </span>
                <label htmlFor="" className={styles.label}>
                    <span className={styles.text}>Please enter your email</span>
                    <input type="email" className={styles.input} />
                </label>
                <button className={styles.button}>Send email</button>
            </div>

            <div className={styles.children}>
                <span className={styles.title}>Change password</span>
                <span className={styles.text}>
                    Your security is our priority. Keep your account safe and
                    sound by changing your password. Let's reinforce that
                    shield. Let's begin!
                </span>
                <label htmlFor="" className={styles.label}>
                    <span className={styles.text}>
                        Please enter your current password
                    </span>
                    <input type="text" className={styles.input} />
                    <span className={styles.text}>
                        Please create a new password
                    </span>
                    <input type="text" className={styles.input} />
                    <span className={styles.text}>
                        Please confirm your password
                    </span>
                    <input type="text" className={styles.input} />
                </label>
                <button className={styles.button}>Change password</button>
            </div>

            <div className={styles.children}>
                <span className={styles.title}>Switch to private account?</span>
                <span className={styles.text}>
                    Your data, your rules. Tailor your account's privacy to suit
                    your needs. Let's customize your online experience. Let's
                    begin!
                </span>
                <label htmlFor="" className={styles.label}>
                    <span id={styles.link}>Switch to Private account.</span>
                </label>
            </div>

            <div className={styles.children}>
                <span className={styles.title} id={styles.danger}>
                    Delete Account?
                </span>
                <span className={styles.text} id={styles.danger}>
                    We're sorry to see you go, but we're here to assist. If
                    you're sure about closing your account, let's proceed. Your
                    journey with us ends here.
                </span>
                <label htmlFor="" className={styles.label}>
                    <button className={styles.button} id={styles.dangerButton}>
                        Delete account
                    </button>
                </label>
            </div>

            <div className={styles.children}>
                <span className={styles.title} id={styles.danger}>
                    Log out
                </span>
                <span className={styles.text} id={styles.danger}>
                    Ready to sign out and safeguard your session? It's a simple
                    step to keep your account secure. Let's log you out safely.
                    Just one click away.
                </span>
                <label htmlFor="" className={styles.label}>
                    <button className={styles.button} id={styles.dangerButton}>
                        Log out
                    </button>
                </label>
            </div>
        </div>
    );
};

export default page;
