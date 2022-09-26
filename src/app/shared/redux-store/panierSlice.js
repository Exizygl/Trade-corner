import { createSlice } from '@reduxjs/toolkit';
import { addProductState } from '../services/addProductServices';





const initialState = {
    panier: []
};

export const panierSlice = createSlice({
    name: 'panier',
    initialState,
    reducers: {
        addProduct: (state, action) => {

                // state.product = action.payload
            console.log("(-_^)")
            const copyPanier = [...state.panier];
            position = copyPanier.panier.indexOf(action.payload.id);
            if (position) {
                state.product = [...state.product]
                console.log("(^o^)")
            } else {
                state.product = [...state.product, action.payload]
                console.log("(-_-)")
            }
        },
    },
});

export const { addProduct } = panierSlice.actions;



export default panierSlice.reducer;
