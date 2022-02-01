import { createSlice } from '@reduxjs/toolkit';

const initial_states = {
    show_tour: false,
    is_gd_ready: false,
    show_message_page: false,
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
        updateShowMessagePage: (state, action) => {
            state.show_message_page = action.payload;
        },
    },
});

export const { updateShowTour, setGdReady, updateShowMessagePage } = uiSlice.actions;

export default uiSlice.reducer;
