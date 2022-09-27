import { createSlice } from '@reduxjs/toolkit';
import { addProductState } from '../services/addProductServices';





const initialState = {
    products: []
};

export const panierSlice = createSlice({
    name: 'panier',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products = [action.payload]
            
            
            // console.log(state.panier.products)
            // const copyPanier = state.panier.products;
            // console.log(copyPanier)
            // position = copyPanier.panier.indexOf(action.payload.panier.id);
            // if (position) {
            //     state.product = [...state.product]
            //     console.log("(^o^)")
            // } else {
            //     state.product = [...state.product, action.payload]
            //     console.log("(-_-)")
            // }
        },
    },
});

export const { addProduct } = panierSlice.actions;



export default panierSlice.reducer;
