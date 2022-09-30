
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getListProduct, getNewProduct } from '../../api/backend/requestApi';
import { URL_PRODUCTLIST } from '../../shared/constants/urls/urlConstants';
import Product from './card/Product';
import { updateProduct, deleteProduct } from '../../shared/redux-store/panierSlice';
import ProductSellers from './card/ProductSellers';

const Panier = () => {
    var panier = useSelector((state) => state.panier.products);
    const [products, setProducts] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispactch = useDispatch()



    useEffect(() => {
        console.log(panier)
        if (panier.length > 0) {

            const idList = panier.map(item => {
                return (
                    item.id
                );
            });
            var idString = idList.toString().toString()

            
            getListProduct(idString).then(
                function (res) {
                    if (res.status === 200) {
                        var result = res.data.message.productList

                        var getSellers = result.map((item) => { return item.sellerId.pseudo })
                        console.log(getSellers)
                        var uniqueSellers = [];
                        getSellers.forEach((e) => {
                            if (!uniqueSellers.includes(e)) {
                                uniqueSellers.push(e);
                            }
                        });
                        setSellers(uniqueSellers)
                        var listProduct = listProductCheck(result, panier)
                        console.log(listProduct)
                        setProducts(listProduct)
                    }
                }
            );
        } else {
            setSellers([])
            setProducts([])
        }
    }, [loading]);


    const listProductCheck = (listProduct, listPanier) => {

        console.log(listProduct)
        console.log(listPanier)

        const checkList = listPanier.map(Product => {
            console.log(Product)
            var checkProduct = listProduct.find((item) => item._id == Product.id)
            console
            if (checkProduct) {
                if (checkProduct.quantity < Product.number) {

                    const updateProduct = {
                        id: checkProduct.id,
                        number: checkProduct.quantity
                    }

                    useDispatch(updateProduct(updateProduct))
                    return updateProduct
                }
                return checkProduct
            } else {

                setError(true)
                dispactch(deleteProduct(Product))
            }

        });
        return checkList
    }

    const updateNumber = (id, number, max) => {
        console.log(number)
       
        if(number <= 0 || number == null) number = ""
        
        console.log(number)
        var checkNumber
        if (number < max + 1) {
            console.log("here")
            checkNumber = number
         }else{
            console.log("there")

            checkNumber = max
        }

        var newProduct = {
            id: id,
            number: checkNumber
        }

        console.log(newProduct)
        dispactch(updateProduct(newProduct))


    }
    const deleteArticle = (id) => {
       
        
        dispactch(deleteProduct(id))
        var toogle = !loading
        setLoading(toogle)
        


    }
    const displayProducts = () => {

        const uniqueSellers = sellers

        const list = uniqueSellers.map(seller => {

            var listProduct = products.filter(item => item.sellerId.pseudo == seller)
            return (

                <div>
                    <h1>Vendeur : {seller}</h1>
                    <ProductSellers
                        key={seller.seller}
                        listProduct={listProduct}
                        panier={panier}
                        updateNumber={updateNumber}
                        deleteArticle={deleteArticle}

                    />
                </div>
            );
        });

        return (
            <div>
                {list}
            </div>
        )
    };

    return (

        <div>
            <h1 className=''>Panier </h1>
            <div>
                {displayProducts()}
            </div>
        </div>
    );

}
export default Panier;
