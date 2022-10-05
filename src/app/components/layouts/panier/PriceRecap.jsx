import React from 'react';


import { Link } from 'react-router-dom';
import { URL_PRODUCT } from '../../../shared/constants/urls/urlConstants';









const PriceRecap = ({ listProduct, panier}) => {

    const number = listProduct.length

    var numberBought = 0

    for (let i = 0; i < number; i++) {

        var product = listProduct[i];

        var foundProduct = panier.filter(item => item.id == product._id)
        
        if(foundProduct){
        
        var numberProduct = parseInt(foundProduct[0].number)

        numberBought = numberBought + numberProduct

        }
        
        
    }


    var sum = listProduct.reduce((price, product) => {
        return price + product.price;
    }, 0);





    return (

        <div className='flex'>
            <div>{numberBought} Article : </div>
            <div>{sum / 100} </div>
        </div>
    )
}



export default PriceRecap