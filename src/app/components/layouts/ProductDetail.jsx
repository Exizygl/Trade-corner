import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/backend/requestApi';

import { Link } from 'react-router-dom';
import { URL_SHOP } from '../../shared/constants/urls/urlConstants';

const ProductDetail = () => {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [seller, setSeller] = useState([]);
    const [date, setDate] = useState([]);
    const productDetail = product;

    const { id } = useParams();
    const sellerId = seller._id;
    console.log("id : " + sellerId);

    useEffect(() => {
        getProduct(id).then(function (res) {
            if (res.status === 200) {
                setProduct(res.data.message.product);
                setCategory(res.data.message.product.categoryId);
                setSeller(res.data.message.product.sellerId);
                setDate(dateFormat(res.data.message.product.createdAt));
            }
        });
    }, []);

    const dateFormat = (date) => {
        return date.slice(8, -14) + '/' + date.slice(5, -17) + '/' + date.slice(0, -20);
    };
    return (
        <div>
            <div className="flex text-white">
                {productDetail.imageProductUrl ? (
                    <img
                        src={
                            `http://localhost:8080/static/` +
                            productDetail.imageProductUrl[0]
                        }
                        onError={(e) =>
                            (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)
                        }
                        className="ml-[3.125rem] mt-[2.813rem] m-12 w-[33.125rem] h-[32.813rem]"
                        alt="preview"
                        width={200}
                        height={200}
                    />
                ) : (
                    <img
                        src={`http://localhost:8080/static/default.jpg`}
                        className="ml-[3.125rem] mt-[2.813rem] m-12 w-[33.125rem] h-[32.813rem]"
                        alt="preview"
                        width={200}
                        height={200}
                    />
                )}

                <div className="mt-10 w-[47.875rem]">
                    <h1 className="font-bold leading-[2.25rem] text-[1.5rem] mb-4">
                        {productDetail.title}
                    </h1>
                    <div className="font-normal text-[1.125rem] mb-8">
                        {category.label}
                    </div>
                    <p className="w-[47.75rem] font-normal leading-[1.75rem] text-[1rem]">
                        {productDetail.description}
                    </p>

                    <div className="mt-16 flex">
                        <div className="flex items-end justify-between w-full mb-6">
                            <div className="font-bold text-[1rem] mr-4">
                                Prix :
                                <span className="font-normal text-[1.5rem]">
                                    {productDetail.price / 100}€
                                </span>
                            </div>
                            <div className="font-bold text-[1rem] ">
                                Stock :
                                <span className="font-normal text-[1.5rem] ml-4">
                                    {productDetail.quantity}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex items-end justify-between w-full mb-6">
                            <div className="font-bold text-[1rem] mr-4">
                                Vendu par :
                                <Link to={URL_SHOP+sellerId}>
                                    <span className="font-normal text-[1.5rem] ml-4  cursor-pointer hover:underline">
                                        {seller.pseudo}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex items-end justify-between w-full mb-6">
                            <div className="font-bold text-[1rem] mr-4">
                                En ligne depuis le :
                                <span className="font-normal text-[1.5rem] ml-4">
                                    {date}
                                </span>
                            </div>

                            <button className=" m-auto btn-primary">
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
