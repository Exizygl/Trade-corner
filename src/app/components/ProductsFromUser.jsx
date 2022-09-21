import React from 'react';
import { useState, useEffect } from 'react';
import { getProduct, getProductsFrom } from '../api/backend/requestApi';
import { useParams } from 'react-router-dom';
import Product from './layouts/card/Product';

const ProductsFromUser = () => {
    const [products, setProduct] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getProductsFrom(id).then(function (res) {
            if (res.status === 200) {
                setProduct(res.data.message.productList);
            }
        });
    }, []);

    const displayProducts = () => {
        const list = products.map((item) => {
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
            <div className="text-center">{displayProducts()}</div>
        </div>
    );
};
export default ProductsFromUser;
