import React from 'react';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { getProductsFrom } from '../api/backend/requestApi';
=======
import { getProduct } from '../api/backend/requestApi';
>>>>>>> 0de64b78bf659082cd5b6b207b629577621b645e
import { useParams } from 'react-router-dom';
import Product from './layouts/card/Product';

const ProductsFromUser = () => {
<<<<<<< HEAD
    const [productUser, setProductUser] = useState([]);
=======
    const [product, setProduct] = useState([]);
>>>>>>> 0de64b78bf659082cd5b6b207b629577621b645e

    const { id } = useParams();

    useEffect(() => {
<<<<<<< HEAD
        getProductsFrom(id).then(function (res) {
            if (res.status === 200) {
                console.log(res.data.message.productList);
                setProductUser(res.data.message.productList);
=======
        getProduct(id).then(function (res) {
            if (res.status === 200) {
                setProduct(res.data.message.product);
                setSeller(res.data.message.product.sellerId);
>>>>>>> 0de64b78bf659082cd5b6b207b629577621b645e
            }
        });
    }, []);

<<<<<<< HEAD
    const displayProduct = () => {
        const list = productUser.map((item) => {
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
        );
    };

    return (
        <div>
            <div className="text-center">{displayProduct()}</div>
=======
    return (
        <div>
            <Product />
>>>>>>> 0de64b78bf659082cd5b6b207b629577621b645e
        </div>
    );
};
export default ProductsFromUser;
