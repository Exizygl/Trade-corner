import {createSlice} from '@reduxjs/toolkit';


const initialState = {
   //valeurs en dures pour test 
    //users : [{name : "Leia", role : "Sénatrice"}],

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
