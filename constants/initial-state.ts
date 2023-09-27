import { INITIAL_STATE_TYPE } from './type';

export const INITIAL_STATE = {
    user: {
        loading: false,
        error: null,
        userId: localStorage.getItem('userId') || null,
    },
    thread: {
        loading: false,
        error: null,
    },
    replies: {
        loading: false,
        error: null,
    },
    reposts: {
        loading: false,
        error: null,
    },
} as unknown as INITIAL_STATE_TYPE;
