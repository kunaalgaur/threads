export type User = {
    _id: string;
    name: string;
    email: string;
    username: string | null;
    image: string | null;
    bio: string;
    followers: string[];
    followings: string[];
};

export type Post = {
    _id: string;
    userId: {
        _id: string;
        username: string;
        image: string;
    };
    caption: string | null;
    image: string | null;
    likes: string[];
    children: string[];
    createdAt: string;
};

export type INITIAL_STATE_TYPE = {
    user: {
        loading: boolean;
        error: any | null;
        userId: string | null;
    };
    thread: { loading: boolean; error: any | null };
    replies: { loading: boolean; error: any | null };
    repost: { loading: boolean; error: any | null };
};
