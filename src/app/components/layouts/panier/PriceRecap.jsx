import React from 'react';


import { Link } from 'react-router-dom';
import { URL_PRODUCT } from '../../../shared/constants/urls/urlConstants';









const PriceRecap = ({ listProduct}) => {

    const number = listProduct.length

    var sum = listProduct.reduce((price, product) => {
        return price + product.price;
    }, 0);




    return (

        <div className='flex'>
            <div>{number} Article : </div>
            <div>{sum} </div>
        </div>
    )
}



export default PriceRecap