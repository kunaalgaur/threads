import Thread from '@/components/card/Thread/Thread';
import styles from './page.module.css';
import { useAppSelector } from '@/redux/hooks';

export default function Home() {
  return (
    <div id={styles.container}>
      <div></div>
      <Thread />
      <Thread />
      <Thread />
      <Thread />
      <Thread />
      <Thread />
      <Thread />
      <Thread />
      <Thread />
      <Thread />
      <Thread />
      <Thread />
    </div>
  );
}
