
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getNewProduct } from '../../api/backend/requestApi';


import { } from '../../shared/constants/urls/urlConstants';
import { updateUser } from '../../shared/redux-store/authenticationSlice';
import Product from './card/Product';




const Home = () => {

    const [products, setProducts] = useState([]);






    useEffect(() => {

        getNewProduct().then(
            function (res) {
               
                if (res.status === 200) {
                    setProducts(res.data.message.productList)
                    
                    
                }
            }
        );

    }, []);


    const displayProducts = () => {
        const list = products.map(item => {
            return (
                <Product
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    price={item.price}
                    category={item.category}
                    image={item.imageProductUrl[0]}
                    
                />
            );
        });

        return (
            <div>
                <h1 className='font-bold text-2xl h-14 ml-[3.125rem] mb-[2.125rem] text-white'>LES NOUVEAUTÉS </h1>
                <div className="flex">{list}</div>
            </div>
        )


    }
    return (

        <div className='background'>{displayProducts()}</div>
    );
};

export default Home;
