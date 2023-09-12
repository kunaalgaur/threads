import OnboardingForm from '@/components/form/onboardingForm/OnboardingForm';
import styles from './page.module.css';

const page = () => {
  return (
    <div>
      <div id={styles.container}>
        <div id={styles.wrapper}>
          <span id={styles.heading}>Onboarding</span>
          <span id={styles.text}>
            Prepare to explore, connect, and converse in a world of vibrant
            communities and meaningful discussions. Your journey starts here!
          </span>
          <OnboardingForm />
          <span className={styles.text}></span>
        </div>
      </div>
    </div>
  );
};

export default page;
