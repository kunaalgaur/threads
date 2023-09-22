export type User = {
    _id: string;
    name: string;
    email: string;
    username: string | null;
    image: string | null;
    bio: string | null;
    followers: string[];
    followings: string[];
};

export type Post = {
    _id: string;
    userId: string;
    caption: string | null;
    image: string | null;
    likes: string[];
    children: string[];
};
