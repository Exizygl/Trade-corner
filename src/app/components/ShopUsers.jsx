import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
<<<<<<< HEAD
import { useEffect } from 'react';
import { userInfo } from '../api/backend/requestApi';
import ProductsFromUser from './ProductsFromUser';
=======
 import { useEffect } from 'react';
 import { userInfo } from '../api/backend/requestApi';
>>>>>>> 0de64b78bf659082cd5b6b207b629577621b645e

const ShopUsers = () => {
    // const [shop, setShop] = useState([]);
    const [seller, setSeller] = useState([]);
    // const shopUsers = shop;

    const { id } = useParams();

<<<<<<< HEAD
    useEffect(() => {
=======
     useEffect(() => {
>>>>>>> 0de64b78bf659082cd5b6b207b629577621b645e
        userInfo(id).then(function (res) {
            if (res.status === 200) {
                //setShop(res.data.message.shop);
                setSeller(res.data.pseudo);
            }
        });
    }, []);

    return (
        <div>
            <h1 className="m-[50px] text-white">BOUTIQUE DE {seller}</h1>

            <div className="m-[106px] p-1 w-[200px] h-[200px] rounded-full ring-2 ring-gray-300 dark:ring-gray-500"></div>
            <div className="m-[50px] w-[297px] h-[506px] text-sm font-medium text-white bg-black">
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
    );
};

export default ShopUsers;
