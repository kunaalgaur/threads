export type User = {
  _id: string;
  name: string;
  username: string | null;
  image: string | null;
  email: string;
  password: string;
  followers: object;
  followings: object;
};

export type Post = {
  _id: string;
  userId: string;
  caption: string | null;
  image: string | null;
  likes: object;
  children: object;
};
