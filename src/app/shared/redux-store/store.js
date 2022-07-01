import { configureStore } from '@reduxjs/toolkit';

import authenticationReducer from './authenticationSlice';
import administrationReducer from './administrationSlice';

/**
 * To configure the store redux.
 *
 * 
 */
export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        adm : administrationReducer,
    },
});