
import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNewProduct } from '../../api/backend/requestApi';
import { URL_PRODUCTLIST } from '../../shared/constants/urls/urlConstants';
import Product from './card/Product';
import { addProduct } from '../../shared/redux-store/panierSlice';

const Panier = () => {
    const panier = useSelector((state) => state.panier.products);
    const [products, setProducts] = useState([]);
    const dispactch = useDispatch()
    


    useEffect(() => {
        console.log(panier)
        const idList = panier.map(item  => {
            return (
               item.id
            );
        });
        console.log(idList)
        getNewProduct().then(
            function (res) {
                console.log("la")
                if (res.status === 200) {
                    console.log(res.data.message.productList)
                    setProducts(res.data.message.productList)
                }
            }
        );

    }, []);


        

    return (

        <div>
            <h1 className=''>Panier </h1>
        </div>
    );
};

export default Panier;
