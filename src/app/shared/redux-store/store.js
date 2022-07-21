import { configureStore } from '@reduxjs/toolkit';

//imports pour persister le store sur le local storage
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import authenticationReducer from './authenticationSlice';
import administrationReducer from './administrationSlice';

//pour persister le store sur le localStorage
const persistConfig = {key: 'user',storage,};

const reducers = combineReducers({ auth: authenticationReducer, adm : administrationReducer,}); //on doit combiner les reducers pour les mettre sur le LS
const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * To configure the store redux.
 *
 * 
 */
export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        adm : administrationReducer,
        pers : persistedReducer,// reducers persisté
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

