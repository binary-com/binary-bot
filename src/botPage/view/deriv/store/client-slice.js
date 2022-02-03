import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
    active_token: {},
    token_list: [],
    balance: 0,
    accounts: {},
    currency: 'USD',
    is_virtual: false,
    login_id: '',
    total: {},
    total_real: 0,
    total_demo: 0,
    is_eu: false,
    is_gd_logged_in: false,
};

export const clientSlice = createSlice({
    name: 'client',
    initialState: initial_state,
    reducers: {
        setGdLoggedIn: (state, action) => {
            state.is_gd_logged_in = action.payload;
        },
    },
});

export const { setGdLoggedIn } = clientSlice.actions;

export default clientSlice.reducer;
