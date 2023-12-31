import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const editUser = createSlice({
    name: 'EDIT USER',
    initialState,
    reducers: {
        EDIT_USER_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        EDIT_USER_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        EDIT_USER_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE } =
    editUser.actions;
export default editUser.reducer;
