import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { userInfo } from '../../../api/backend/requestApi';
import ProductsFromUser from '../products/ProductsFromUser';

const ShopUsers = () => {
    // const [shop, setShop] = useState([]);
    const [seller, setSeller] = useState([]);
    // const shopUsers = shop;
   

    const { id } = useParams();

    useEffect(() => {
        userInfo(id).then(function (res) {
            if (res.status === 200) {
                //setShop(res.data.message.shop);
                setSeller(res.data.pseudo);
            }
        });
    }, []);

    return (
        <div className="px-3 md:px-10 text-white">
            <h1>BOUTIQUE DE {seller}</h1>
            <div id="contenuPrincipal" className="flex flex-col md:flex-row">
                <div id="navigation" className="basis-3/12 md:max-w-[316px] mb-[25px] md:mb-0">
                    <div className=" mx-auto mb-[30px] w-[200px] h-[200px] rounded-full ring-2 ring-gray-300 dark:ring-gray-500"></div>
                    <div className="w-full m-auto md:m-0 h-min md:h-[506px] text-sm font-medium text-white bg-black">
                        <button
                            aria-current="true"
                            type="button"
                            className="py-2 px-4 w-full font-medium text-left text-white  cursor-pointer "
                        >
                            Tous les articles:
                        </button>

                        <button
                            type="button"
                            className="py-2 px-4 w-full font-medium text-left cursor-pointer hover:bg-[#AD09FF]"
                        >
                            Jeux Video
                        </button>

                        <button
                            type="button"
                            className="py-2 px-4 w-full font-medium text-left cursor-pointer hover:bg-[#AD09FF] "
                        >
                            Goodies
                        </button>

                        <button
                            type="button"
                            className="py-2 px-4 w-full font-medium text-left cursor-pointer hover:bg-[#AD09FF]"
                        >
                            Comics/Manga
                        </button>

                        <button
                            type="button"
                            className="py-2 px-4 w-full font-medium text-left cursor-pointer hover:bg-[#AD09FF]"
                        >
                            DVD/Blue-ray
                        </button>
                    </div>
                </div>
                <div id="products" className="w-11/12 md:w-full m-auto md:m-0 md:basis-9/12 ">
                <ProductsFromUser /> 
                </div>
            </div>         
        </div>
    );
};

export default ShopUsers;
