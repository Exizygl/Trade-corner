import React from 'react';


import { Link } from 'react-router-dom';
import { URL_PRODUCT } from '../../../shared/constants/urls/urlConstants';









const PriceRecap = ({ listProduct, panier}) => {

    const number = listProduct.length

    var numberBought = 0

    var sum = 0

    for (let i = 0; i < number; i++) {

        var product = listProduct[i];

        var foundProduct = panier.filter(item => item.id == product._id)
        
        if(foundProduct.length > 0){
        
        var numberProduct = parseInt(foundProduct[0].number)

        
        
        numberBought = numberBought + numberProduct
        

        var price = parseInt(product.price)
        
    
        sum = sum + price * numberProduct;
        

        }
        
        
    }


    




    return (

        <div className='flex justify-between'>
            <div>{numberBought} Article : </div>
            <div>{sum / 100} €</div>
        </div>
    )
}



export default PriceRecap