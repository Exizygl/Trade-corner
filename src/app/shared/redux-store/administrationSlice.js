import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    //initialisation normale
    users : [],
    roles : [],
};

export const AdministrationSlice = createSlice({
    name: 'adm',
    initialState,
    reducers: {
        setListUsers : (state, action) => {
            state.users = action.payload;
        },
        setListRoles : (state, action)  => {
            state.roles = action.payload;
        }
    },
});

export const { setListUsers, setListRoles } = AdministrationSlice.actions;
export default AdministrationSlice.reducer;
