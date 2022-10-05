<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
>>>>>>> panier
import { Link } from 'react-router-dom';
import { getNewProduct } from '../../api/backend/requestApi';
import { URL_PRODUCTLIST } from '../../shared/constants/urls/urlConstants';
import Product from './card/Product';
<<<<<<< HEAD
import photoAccueil from "../../assets/images/photoAccueil.jpg";

const Home = () => {
=======
import { addProduct } from '../../shared/redux-store/panierSlice';

const Home = () => {
    const panier = useSelector((state) => state.panier.products);
>>>>>>> panier
    const [products, setProducts] = useState([]);
    const dispactch = useDispatch()


    const addProductPanier = (e) => {


        const product = {
            id: e,
            number: 1
        }
        
        dispactch(addProduct(product))
    }

    

    useEffect(() => {
        getNewProduct().then(function (res) {
            if (res.status === 200) {
                setProducts(res.data.message.productList);
            }else {
                console.log("products");
            }
        });
    }, []);

    const displayProducts = () => {
<<<<<<< HEAD
        const list = products.map((item) => {
=======

        const list = products.map(item => {

>>>>>>> panier
            return (
                <Product
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    price={item.price}
                    category={item.category}
                    image={item.imageProductUrl[0]}
<<<<<<< HEAD
                    sellerId={item.sellerId}
=======
                    addProduct={addProductPanier}
>>>>>>> panier
                />
            );
        });

        return (
            <div className="flex justify-around lg:justify-between flex-wrap gap-[20px]">{list}</div>   
        );
    };

    return (
        <div>
            <img src={photoAccueil} className="half-screen max-h-[580px] w-full object-cover object-top mb-[40px]"/>
            <h1 className="">LES NOUVEAUTÉS </h1>
            <div className="text-center text-white">
                {products.length != 0 && displayProducts()}
                {products.length === 0 && <p className="mb-10"> Il n'y a pas de produits dans la BDD </p>}

                <Link to={URL_PRODUCTLIST}>
                    <button className="btn-primary w-[300px]">Voir plus</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
