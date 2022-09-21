import { createSlice } from '@reduxjs/toolkit';





const initialState = {
    product:[]
};

export const panierSlice = createSlice({
    name: 'panier',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.product = [...state.product, action.payload]
           
        },
    },
});

export const { addProduct } = panierSlice.actions;



export default panierSlice.reducer;
