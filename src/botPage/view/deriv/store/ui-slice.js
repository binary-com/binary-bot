import { createSlice } from '@reduxjs/toolkit';

const initial_states = {
    show_tour: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initial_states,
    reducers: {
        updateShowTour: (state, action) => {
            state.show_tour = action.payload;
        },
    },
});

export const { updateShowTour } = uiSlice.actions;

export default uiSlice.reducer;
