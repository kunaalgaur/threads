import { string } from 'yup';

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

export type IReply = {
    _id: string;
    threadId: string;
    userId: {
        _id: string;
        username: string;
        image: string;
    };
    body: string;
    likes: string[];
};

export type follower = {
    _id: string;
    name: string;
    username: string | null;
    image: string;
};
