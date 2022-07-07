import { createSlice } from '@reduxjs/toolkit';

import { isAuthenticated, isUserId } from '../services/accountServices';
import { setToken } from '../services/tokenServices';

/**
 * initial state: is logged check if the user is already authenticated when openning the Application
 * 
 */
const initialState = {
    isLogged: isAuthenticated(),
    userId: isUserId(),
    user: false
};

export const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            setToken(action.payload.id_token);
            state.isLogged = true;
            state.userId = isUserId();
            state.user = action.payload.user
        },
        signOut: (state) => {
            localStorage.clear();
            sessionStorage.clear();
            state.isLogged = false;
            state.userId = false;
        },
        updateUser: (state, action) => {
           
            state.user = action.payload
        },
    },
});

export const { signIn, signOut, updateUser} = authenticationSlice.actions;

export const selectIsLogged = (state) => state.auth.isLogged;

export default authenticationSlice.reducer;
