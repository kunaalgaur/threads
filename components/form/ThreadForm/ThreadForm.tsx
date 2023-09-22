import Image from 'next/image';
import styles from './ThreadForm.module.css';
import { HiXMark } from 'react-icons/hi2';
import { UploadButton } from '@/utils/uploadthing';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import ReactLoading from 'react-loading';
import toast, { Toaster } from 'react-hot-toast';

const userId = localStorage.getItem('userId') as string;

const ThreadForm = ({
  state,
  toggleState,
}: {
  state: boolean;
  toggleState: any;
}) => {
  const [user, setUser] = useState<any>();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [caption, setCaption] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/api/user/get-user/${userId}`);

      if (!res.ok) {
        throw new Error('There was an unexpected error');
      }

      const response = await res.json();
      setUser(response.user);
    };

    getUser();
  }, [userId]);

  console.log(user);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!caption && !image) {
        toast.error('Cannot upload an empty thread.');
      }

      const res = await fetch('/api/thread/create-thread', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          image: image,
          caption: caption,
        }),
      });

      const response = await res.json();

      if (!res.ok) {
        return toast.error(response.message, {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          duration: 6000,
        });
      }

      if (res.ok) {
        return toast.success(response.message, {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          duration: 6000,
        });
      }
    } catch (error: any) {
      console.error(error);
      return toast.error(error.message, {});
    } finally {
      setLoading(false);
      return toggleState;
    }
  };

  return (
    <div id={styles.container} style={{ display: state ? 'block' : 'none' }}>
      <div id={styles.wrapper}>
        <div onClick={toggleState} id={styles.closeButton}>
          <HiXMark />
        </div>

        <form method="POST" id={styles.form}>
          <Toaster position="top-center" reverseOrder={true} />
          <div id={styles.top}>
            <div id={styles.left}>
              <Image
                src={user?.image || '/user.png'}
                alt=""
                height={50}
                width={50}
              />
            </div>

            <div id={styles.right}>
              <div>
                <span id={styles.username}>{user?.username}</span>

                <textarea
                  name="caption"
                  id="caption"
                  placeholder="Start a thread..."
                  className={styles.textarea}
                  style={{ width: '100%' }}
                  onChange={(e: any) => setCaption(e.target.value)}
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

            <button type="submit" id={styles.button} onClick={handleSubmit}>
              {loading ? (
                <ReactLoading
                  type="spin"
                  color="white"
                  height={20}
                  width={20}
                />
              ) : (
                'Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThreadForm;
