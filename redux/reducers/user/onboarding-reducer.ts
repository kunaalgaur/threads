import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
    userId: string | null;
};

const initialState = {
    loading: false,
    error: null,
    userId: (localStorage.getItem('userId') as string) || null,
} as unknown as INITIAL_STATE;

export const onboarding = createSlice({
    name: 'ONBOARDING',
    initialState,
    reducers: {
        ONBOARDING_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        ONBOARDING_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        ONBOARDING_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { ONBOARDING_REQUEST, ONBOARDING_SUCCESS, ONBOARDING_FAILURE } =
    onboarding.actions;
export default onboarding.reducer;
