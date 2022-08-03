import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    //initialisation normale
<<<<<<< HEAD
    users : [],
    roles : [],
=======
    users: [],
>>>>>>> 6969d2f50ec88e99063f93a063b6543be64a83fd
};

export const AdministrationSlice = createSlice({
    name: 'adm',
    initialState,
    reducers: {
        setListUsers: (state, action) => {
            state.users = action.payload;
        },
        setListRoles : (state, action)  => {
            state.roles = action.payload;
        }
    },
});

export const { setListUsers, setListRoles } = AdministrationSlice.actions;
export default AdministrationSlice.reducer;
