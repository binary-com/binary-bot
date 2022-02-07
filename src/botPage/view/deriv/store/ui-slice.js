import { createSlice } from '@reduxjs/toolkit';

const initial_states = {
    show_tour: false,
    is_gd_ready: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initial_states,
    reducers: {
        updateShowTour: (state, action) => {
            state.show_tour = action.payload;
        },
        setGdReady: (state, action) => {
            state.is_gd_ready = action.payload;
        },
    },
});

export const { updateShowTour } = uiSlice.actions;
export const { setGdReady } = uiSlice.actions;

export default uiSlice.reducer;
