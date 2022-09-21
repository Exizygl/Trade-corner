import React from 'react';
import { useState, useEffect } from 'react';
import { getProduct, getProductsFrom } from '../../../api/backend/requestApi';
import { useParams } from 'react-router-dom';
import Product from '../card/Product';

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
                <div className="flex flex-wrap justify-around">{list}</div>   
        );
    };

    return (
            displayProducts()  
    );
};
export default ProductsFromUser;
