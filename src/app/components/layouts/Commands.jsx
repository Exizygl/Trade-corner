import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getListProduct, getTransporteur } from '../../api/backend/requestApi';
import { URL_MODIFYACCOUNT } from '../../shared/constants/urls/urlConstants';
import Product from './card/Product';
import { updateProduct, deleteProduct } from '../../shared/redux-store/panierSlice';
import ProductSellers from './panier/ProductSellers';
import PriceRecap from './panier/PriceRecap';

const Commands = () => {
    const user = useSelector((state) => state.auth.user);
    var panier = useSelector((state) => state.panier.products);
    const [products, setProducts] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [transporteurs, setTransporteurs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    const dispatch = useDispatch()



    useEffect(() => {

        if (panier.length > 0) {

            getTransporteur().then(
                function (res){
                    if (res.status === 200) {
                        setTransporteurs(res.data.message.TransporteurList);
                    }

                }
            )

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
                        var listProduct = listProductCheck(result, panier)
                        var getSellers = result.map((item) => { return item.sellerId.pseudo })

                        var uniqueSellers = [];
                        getSellers.forEach((e) => {
                            if (!uniqueSellers.includes(e)) {
                                uniqueSellers.push(e);
                            }
                        });
                        setSellers(uniqueSellers)

                        setProducts(listProduct)
                    }
                }
            );
        } else {

            setSellers([])
            setProducts([])
        }
    }, [loading, panier]);


    const listProductCheck = (listProduct, listPanier) => {



        const checkList = listPanier.map(Product => {

            var checkProduct = listProduct.find((item) => item._id == Product.id)


            if (checkProduct) {
                if (checkProduct.quantity == 0 || !checkProduct) {

                    setError(true)
                    dispatch(deleteProduct(Product.id))

                } else if (checkProduct.quantity < Product.number) {

                    const updateProducts = {
                        id: checkProduct._id,
                        number: checkProduct.quantity
                    }


                    dispatch(updateProduct(updateProducts))

                }
                return checkProduct

            }
        });
        return checkList
    }

    const updateNumber = (id, number, max) => {


        if (number <= 0 || number == null) number = ""

        var checkNumber
        if (number < max + 1) {

            checkNumber = number
        } else {


            checkNumber = max
        }

        var newProduct = {
            id: id,
            number: checkNumber
        }



        dispatch(updateProduct(newProduct))


    }
    const deleteArticle = (id) => {


        dispatch(deleteProduct(id))
        var toogle = !loading
        setLoading(toogle)



    }
    const SellerTransporteur = (id) => {


        const uniqueSellers = sellers

        var listResult = uniqueSellers.map(seller => {

            
            return (

                <div className='mt-[20px] ml-[50px] mr-[50px]'>
                    <div className='mb-[25px]'>Mode de Livraison: {seller}</div>
                    <TransporteurChoice
                        key={seller.seller}
                        seller={seller.seller}
                        transporteurs={transporteurs}
                       
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

            if (article.length > 0) {
                var numberProduct = parseInt(article[0].number)

                numberBought = numberBought + numberProduct


                var price = parseInt(product.price)


                sum = sum + price * numberProduct;

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


    }


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

            if (article.length > 0) {
                var numberProduct = parseInt(article[0].number)

                numberBought = numberBought + numberProduct


                var price = parseInt(product.price)


                sum = sum + price * numberProduct;

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

            <h1 className='ml-[50px]'>Payer ma commande </h1>

            <div className='flex'>
                <div className='flex flex-col ml-[50px]'>
                    <div>

                        <div className='bg-black w-[885px] h-[250px] text-white mt-[25px]'>
                            <div className='ml-[50px] mt-[50px] text-white'>Adresse de livraison</div>

                            <div className='ml-[50px] mt-[20px] w-[450px] basis-8/12'>
                                <div>
                                    Nom
                                </div>
                            </div>
                            <div className='ml-[50px] mt-[20px] w-[450px] basis-8/12'>
                                <div>
                                    {user.name}
                                </div>
                            </div>
                            <div className='ml-[50px] mt-[20px] w-[450px] basis-8/12'>
                                <div>
                                    adresse
                                </div>
                                <div className='mt-[20px]'>
                                    {user.adressStreet} {user.adressZipcode} {user.adressCity}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to={URL_MODIFYACCOUNT + 'adress'}>

                        <button className="btn-primary px-10 mt-5 md:mt-0">
                            Modifier mon adresse
                        </button>
                    </Link>
                    {}
                </div>
                {Recap()}

            </div>

        </div>

    );

}
export default Commands;
