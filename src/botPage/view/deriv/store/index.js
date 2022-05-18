import { configureStore } from '@reduxjs/toolkit';
import clientSlice from './client-slice';
import uiSlice from './ui-slice';

export default configureStore({
    reducer: {
        client: clientSlice,
        ui: uiSlice,
    },
});
