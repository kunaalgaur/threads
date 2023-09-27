import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const createReply = createSlice({
    name: 'CREATE REPLY',
    initialState,
    reducers: {
        CREATE_REPLY_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        CREATE_REPLY_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        CREATE_REPLY_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const {
    CREATE_REPLY_FAILURE,
    CREATE_REPLY_REQUEST,
    CREATE_REPLY_SUCCESS,
} = createReply.actions;
export default createReply.reducer;
