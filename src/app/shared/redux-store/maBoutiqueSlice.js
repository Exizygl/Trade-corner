import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    //initialisation normale
    products : [],
    commandes : [],
    history : [],
    
};

export const maBoutiqueSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setListProducts : (state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setListProducts } = maBoutiqueSlice.actions;
export default maBoutiqueSlice.reducer;
