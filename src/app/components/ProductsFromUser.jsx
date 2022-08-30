import React from 'react';
import { useState, useEffect } from 'react';
import { getProduct } from '../api/backend/requestApi';
import { useParams } from 'react-router-dom';
import Product from './layouts/card/Product';

const ProductsFromUser = () => {
    const [product, setProduct] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getProduct(id).then(function (res) {
            if (res.status === 200) {
                setProduct(res.data.message.product);
                setSeller(res.data.message.product.sellerId);
            }
        });
    }, []);

    return (
        <div>
            <Product />
        </div>
    );
};
export default ProductsFromUser;
