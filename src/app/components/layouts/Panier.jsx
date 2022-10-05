
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getListProduct, getNewProduct } from '../../api/backend/requestApi';
import { URL_PRODUCTLIST } from '../../shared/constants/urls/urlConstants';
import Product from './card/Product';
import { updateProduct, deleteProduct } from '../../shared/redux-store/panierSlice';
import ProductSellers from './panier/ProductSellers';
import PriceRecap from './panier/PriceRecap';

const Panier = () => {
    var panier = useSelector((state) => state.panier.products);
    const [products, setProducts] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);
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
            setFirstLoad(true)
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

        if (number <= 0 || number == null) number = ""

        console.log(number)
        var checkNumber
        if (number < max + 1) {
            console.log("here")
            checkNumber = number
        } else {
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
                    <div className='mt-[50px] text-white'>Vendeur: {seller}</div>
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


    const Recap = () => {

        const uniqueSellers = sellers

        var listResult = uniqueSellers.map(seller => {

            var listProduct = products.filter(item => item.sellerId.pseudo == seller)
            return (

                <div className='mt-[20px] ml-[50px] mr-[50px]'>
                    <div className='mb-[25px]'>Vendeur: {seller}</div>
                    <PriceRecap
                        key={seller.seller}
                        listProduct={listProduct}
                        panier={panier}
                    />
                    <div className="line w-[325px] mx-auto text-center"></div>
                </div>
            );
        });

        var sum = 0
        var number = products.length
        var numberBought = 0

        for (let i = 0; i < number; i++) {

            var product = products[i];

            var article = panier.filter(item => item.id == product._id)
            console.log(article)
            if (article.length > 0) {
                var numberProduct = parseInt(article[0].number)
                console.log(numberBought)
                numberBought = numberBought + numberProduct
                console.log(numberBought)

                var price = parseInt(product.price)
                numberBought
                console.log("price " + price)
                sum = sum + price * numberProduct;
                console.log("sum " + sum)
            }

        }


        sum = sum / 100


        const total =
            <div className='mt-[20px] ml-[50px] mr-[50px]'>
                <div>Total</div>
                <div className='flex justify-between'>
                    <div>{numberBought} Article : </div>
                    <div>{sum} €</div>
                </div>
            </div>

        return (
            <div className='w-[430px] ml-[30px] mt-[40px] bg-black text-white'>
                <div className='mt-[20px] text-center text-white'>Récapitulatif</div>
                <div className="line w-[325px] mx-auto text-center"></div>
                {listResult}
                {total}
                <div className='text-center mt-[50px]'>
                    <button className='btn-primary w-[300px] my-auto'>VALIDER MA COMMANDE</button>
                </div>
            </div>
        )
    };

    return (

        <div>
            <h1 className='ml-[50px]'>Panier </h1>
            <div className='flex ml-[50px]'>
                {displayProducts()}
                {Recap()}
            </div>
        </div>
    );

}
export default Panier;
