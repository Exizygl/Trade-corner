
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllProduct } from '../../api/backend/requestApi';


import { } from '../../shared/constants/urls/urlConstants';
import { updateUser } from '../../shared/redux-store/authenticationSlice';




const Home = () => {

    const [products, setProducts] = useState([]);






    useEffect(() => {

        getAllProduct().then(
            function (res) {
                console.log(res)
                if (res.status === 200) {
                    setProducts(res.data)
                    console.log(res.data);
                }
            }
        );

    }, []);


    const displayProducts = (products) => {


    }
    return (

        <div>I'm loaded</div>
    );
};

export default Home;
