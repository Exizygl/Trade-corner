
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

                <div className="flex flex-wrap">{list}</div>
            </div>
        )


    }
    return (

        <div className='text-white'>

            <h1 className='font-bold text-2xl h-14 ml-[3.125rem] mb-[2.125rem]'>Nos Articles </h1>
            <div className='flex justify-around mt-8'>
                <div>
                    JEUX VIDEO
                </div>
                <div>
                    GOODIES
                </div>
                <div>
                    COMICS/MANGA
                </div>
                <div>
                    DVD/BLUE-RAY
                </div>
            </div>

            <div className='mt-20 flex ml-14'>
                <div className='w-[18.75rem] h-full bg-[#53216C]'>
                    
                </div>
                <div>
                    {displayProducts()}
                </div>
            </div>

        </div>




    );
};

export default Home;
