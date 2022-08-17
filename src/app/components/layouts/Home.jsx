
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getNewProduct } from '../../api/backend/requestApi';


import { URL_PRODUCTLIST } from '../../shared/constants/urls/urlConstants';
import { updateUser } from '../../shared/redux-store/authenticationSlice';
import Product from './card/Product';
import Search from './Search';




const Home = () => {

    const [products, setProducts] = useState([]);






    useEffect(() => {
        console.log("poya")
        getNewProduct().then(
            function (res) {
                console.log("poyo")
                if (res.status === 200) {
                    console.log(res.data.message.productList)
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

                <div className="flex">{list}</div>
            </div>
        )


    }
    return (

        <div>
            <h1 className='font-bold text-2xl h-14 ml-[3.125rem] mb-[2.125rem] text-white'>LES NOUVEAUTÉS </h1>
            <div>
                {displayProducts()}
            </div>
            <Link to={URL_PRODUCTLIST}>
            <div className='h-12 w-80 bg-[#53216C] font-bold text-[1rem] flex items-center justify-items-center mt-20 mx-auto'>
            
                <div className='justify-self-center m-auto '>
                    Voir plus
                </div>
            
            </div>
            </Link>
        </div>




    );
};

export default Home;
