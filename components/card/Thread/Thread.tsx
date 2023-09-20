import Image from 'next/image';
import styles from './Thread.module.css';
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArrowPathRoundedSquare,
  HiOutlinePaperAirplane,
} from 'react-icons/hi2';
import { Post } from '@/types/type';

const Thread = () => {
  // const Thread = ({ post }: { post: Post }) => {
  return (
    <div id={styles.container}>
      <div id={styles.top}>
        <div id={styles.left}>
          <Image src="/user.png" alt="" height={30} width={30} />
        </div>

        <div id={styles.right}>
          <div id={styles.rightTop}>
            <span id={styles.username}></span>

            <span id={styles.time}></span>
          </div>

          <span id={styles.caption}></span>

          <Image
            src=""
            alt=""
            height={0}
            width={0}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </div>

      <div id={styles.bottom}>
        <div>
          <Image src="/user.png" alt="" height={15} width={15} />

          <Image src="/user.png" alt="" height={15} width={15} />
        </div>
      </div>

      <HiOutlineHeart />
      <HiOutlineChatBubbleOvalLeft />
      <HiOutlineArrowPathRoundedSquare />
      <HiOutlinePaperAirplane />
    </div>
  );
};

export default Thread;
