import Image from 'next/image';
import styles from './ThreadForm.module.css';
import { HiXMark } from 'react-icons/hi2';
import { UploadButton } from '@/utils/uploadthing';
import { useState } from 'react';

const ThreadForm = ({
  state,
  toggleState,
}: {
  state: boolean;
  toggleState: any;
}) => {
  const [image, setImage] = useState(null);

  return (
    <div id={styles.container} style={{ display: state ? 'block' : 'none' }}>
      <div id={styles.wrapper}>
        <div onClick={toggleState} id={styles.closeButton}>
          <HiXMark />
        </div>

        <form id={styles.form}>
          <div id={styles.top}>
            <div id={styles.left}>
              <Image src="/user.png" alt="" height={50} width={50} />
            </div>

            <div id={styles.right}>
              <div>
                <span id={styles.username}>kunalgaur</span>

                <textarea
                  name="caption"
                  id="caption"
                  placeholder="Start a thread..."
                  className={styles.textarea}
                  style={{ width: '100%' }}
                ></textarea>
              </div>

              {image && (
                <div id={styles.middle}>
                  <Image
                    src={image}
                    alt=""
                    height={0}
                    width={0}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div id={styles.bottom}>
            <UploadButton
              className="custom-class"
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                if (res) {
                  setImage(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />

            <button type="submit" id={styles.button}>
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThreadForm;
