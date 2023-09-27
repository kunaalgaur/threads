import { INITIAL_STATE } from '@/constants/initial-state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const deleteUser = createSlice({
    name: 'DELETE USER',
    initialState,
    reducers: {
        DELETE_USER_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        DELETE_USER_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        DELETE_USER_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS } =
    deleteUser.actions;
export default deleteUser.reducer;
