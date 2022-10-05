import { createSlice, current } from '@reduxjs/toolkit';
import { addProductState } from '../services/addProductServices';





const initialState = {
    products: []
};

export const panierSlice = createSlice({
    name: 'panier',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            const itemExist = state.products.find((item) => item.id == product.id);

            if (!itemExist) {
                state.products = [...state.products, product]
            }


        }, updateProduct: (state, action) => {

            const product = action.payload;
            console.log(product)
            const stateCopy = state.products
            const itemExist = state.products.find((item) => item.id == product.id);
            console.log(current(itemExist))
            const index = state.products.indexOf(itemExist);
            console.log(index)
            if (index >= 0) {
                var number = product.number
                if (number == "") number = 1
                if (typeof number == "string") {
                    const firstNumber = number.charAt(0)
                    if ("0" == firstNumber) number = number.substring(1);
                }
                stateCopy[index].number = parseInt(number)
                console.log(current(stateCopy[index]))

                state.products = stateCopy
            }


        }, deleteProduct: (state, action) => {
            const product = action.payload;
            const stateCopy = state.products
            const itemExist = state.products.find((item) => item.id == product.id);
            const index = state.products.indexOf(itemExist);
            if (index) {
                stateCopy.splice(index, 1)

                state.products = stateCopy
            }

        },
    },
});

export const { addProduct, updateProduct, deleteProduct } = panierSlice.actions;



export default panierSlice.reducer;
