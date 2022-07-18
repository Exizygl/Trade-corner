import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    //initialisation normale
    users : [],
};

export const AdministrationSlice = createSlice({
    name: 'adm',
    initialState,
    reducers: {
        setListUsers : (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { setListUsers } = AdministrationSlice.actions;
export default AdministrationSlice.reducer;
