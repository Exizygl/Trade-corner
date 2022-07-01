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
        ListUsers : (state) => {
            state.users = [{nom : "truc"},
            {nom: "machin"}]
        },

        setListUsers : (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { ListUsers, setListUsers } = AdministrationSlice.actions;
export default AdministrationSlice.reducer;
