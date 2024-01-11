import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getListProduct, getTransporteur, addCommand } from '../../api/backend/requestApi';
import { URL_MODIFYACCOUNT } from '../../shared/constants/urls/urlConstants';
import Product from './card/Product';
import { updateProduct, deleteProduct, deletePanier } from '../../shared/redux-store/panierSlice';
import ProductSellers from './panier/ProductSellers';
import PriceRecap from './panier/PriceRecap';
import TransporteurChoice from './commande/TransporteurChoice';
import { Formik, Form, FormikConsumer, useFormik, Field } from 'formik';

import { validationCommand } from '../../utils/Validation';



const Commands = () => {
    const user = useSelector((state) => state.auth.user);
    var panier = useSelector((state) => state.panier.products);
    const [products, setProducts] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [transporteurs, setTransporteurs] = useState([]);
    const [TransporteurSelection, setTransporteurSelection] = useState("");
    const [loading, setLoading] = useState(false);
    const [payement, setPayement] = useState("");
    const [listId, setListId] = useState([]);


    const [error, setError] = useState(false);
    const dispatch = useDispatch()



    useEffect(() => {

        if (panier.length > 0) {

            getTransporteur().then(
                function (res) {
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
                        var getProductId = result.map((item) => { return item._id })

                        setListId(getProductId);
                        var uniqueSellers = [];
                        getSellers.forEach((e) => {
                            if (!uniqueSellers.includes(e)) {
                                uniqueSellers.push(e);
                            }
                        });
                        var SellersTransportation = [];

                        uniqueSellers.forEach((e) => {
                            var s = { name: e, transporteurPrice: 0 }
                            SellersTransportation.push(s);

                        });
                        setSellers(SellersTransportation)

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
    const SellerTransporteur = () => {




        return (

            <div className='mt-[20px] ml-[50px] mr-[50px]'>
                <div className='mb-[25px]'>Mode de Livraison:</div>
                <TransporteurChoice

                    transporteurs={transporteurs}
                    updateTransporteur={updateTransporteur}
                />
                <div className="line w-[325px] mx-auto text-center"></div>
            </div>
        );
    };


    const updateTransporteur = (transporteur) => {
        setTransporteurSelection(transporteur)
    }


    const updatePayement = (payement) => {
        setPayement(payement)
    }

    const sendCommand = () => {

        if (TransporteurSelection != "" && payement != "") {

            const formData = new FormData();

            for (let i = 0; i < listId.length; i++) {

                formData.append('ids', listId[i]);
                console.log(formData)
            };

            formData.append('transporteur', TransporteurSelection);

            formData.append('payement', payement);



            addCommand(formData)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(deletePanier())
                        history.push(URL_HOME)

                    }
                    else { alert("error") }
                })
        } else {
            alert("remplir le transporteur et choix de payement")
        }
    }

    const Recap = () => {

        const uniqueSellers = sellers
        const numberSellers = uniqueSellers.length

        var listResult = uniqueSellers.map(seller => {

            var listProduct = products.filter(item => item.sellerId.pseudo == seller.name)
            return (

                <div className='mt-[20px] ml-[50px] mr-[50px]'>
                    <div className='mb-[25px]'>Vendeur: {seller.name}</div>
                    <PriceRecap
                        key={seller.name}
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
        var priceTransport
        console.log(transporteurs);
        console.log(TransporteurSelection);
        var findTransporteur = transporteurs.filter(item => item.transporteur == TransporteurSelection)
        var transporteur = findTransporteur[0]
        if (!transporteur) {
            console.log("toya")
            priceTransport = 0
        } else {
            priceTransport = transporteur.price
        }

        console.log(priceTransport)
        const sumPort = numberSellers * priceTransport / 100


        const total =
            <div className='mt-[20px] ml-[50px] mr-[50px]'>
                <div>Total</div>
                <div className='flex justify-between'>
                    <div>{numberBought} Frais de port : </div>
                    <div>{sumPort} €</div>
                </div>
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
                    <button className='btn-primary w-[300px] my-auto' onClick={() => { sendCommand() }}>VALIDER MA COMMANDE</button>
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

                        <div className='bg-black w-[885px] h-[300px] text-white mt-[25px] mb-[25px]  pt-[25px]'>
                            <div className='mt-[20px] text-center text-white'>Adresse de livraison</div>
                            <div className="line w-[325px] mx-auto text-center"></div>
                            <div className='flex'>
                                <div className='ml-[50px] mt-[20px] w-[450px] basis-1/12'>
                                    <div>
                                        Nom:
                                    </div>
                                </div>
                                <div className='ml-[50px] mt-[20px] w-[450px] basis-1/12'>
                                    <div>
                                        {user.name}
                                    </div>
                                </div>
                            </div>
                            <div className="line w-[325px] mx-auto text-center"></div>
                            <div className='ml-[50px] mt-[20px] w-[450px] flex'>
                                <div className='basis-1/12'>
                                    Adresse:
                                </div>
                                <div className='basis-11/12 ml-[50px]'>
                                    {user.adressStreet} {user.adressZipcode} {user.adressCity}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Link to={URL_MODIFYACCOUNT + 'adress'}>

                        <button className="btn-primary mx-12 px-10 mt-7 md:mt-0">
                            Modifier mon adresse
                        </button>
                    </Link>

                    <div className='bg-black text-white'>
                        {SellerTransporteur()}
                    </div>
                    <div className='bg-black text-white'>

                        <div className='mt-[20px] ml-[50px] mr-[50px] mb-[20px]'>
                            <div className='mb-[25px]'>Moyen de payement</div>
                            <div>
                                <div>
                                    <input type="radio" id="carteBancaire" defaultChecked={payement === "CB"} name="payement" value="carteBancaire" onClick={() => { updatePayement("CB") }} />
                                    <label for="carteBancaire">Carte Bancaire</label>

                                </div>
                                <div>
                                    <input type="radio" id="Visa" defaultChecked={payement === "Visa"} name="payement" value="Visa" onClick={() => { updatePayement("Visa") }} />
                                    <label for="Visa">Paypal</label>
                                </div>
                                <div>
                                    <input type="radio" id="Paypal" defaultChecked={payement === "Paypal"} name="payement" value="Paypal" onClick={() => { updatePayement("Paypal") }} />
                                    <label for="Paypal">Paypal</label>

                                </div>
                                <div>
                                    <input type="radio" id="carteCredit" defaultChecked={payement === "CC"} name="payement" value="carteCredit" onClick={() => { updatePayement("CC") }} />
                                    <label for="carteCredit">Carte de credit</label>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                {Recap()}


            </div>

        </div>

    );

}
export default Commands;
