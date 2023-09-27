import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const signout = createSlice({
    name: 'SIGN OUT',
    initialState,
    reducers: {
        SIGNOUT_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        SIGNOUT_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        SIGNOUT_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE } =
    signout.actions;
export default signout.reducer;
