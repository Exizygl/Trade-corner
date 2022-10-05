import React from 'react';


import { Link } from 'react-router-dom';
import { URL_PRODUCT } from '../../../shared/constants/urls/urlConstants';







const ProductSellers = ({ listProduct, panier, updateNumber, deleteArticle }) => {

    const displayProducts = () => {

        const list = listProduct.map(product => {

            var paniersearch = panier.find((item) => item.id == product._id)

            if (paniersearch) {

                var numberProduct = paniersearch.number

                return (

                    <div className='bg-black w-[885px] h-[250px] flex text-white mt-[25px]'>
                        <div className="h-[150px] w-[150px] ml-[25px] mt-[25px] basis-3/12">
                            {product.imageProductUrl[0] ?
                                <img src={`http://localhost:8080/static/` + product.imageProductUrl[0]} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className='m-auto h-[150px] w-[150px]' alt="preview" width={150} height={2150} />
                                :
                                <img src={`http://localhost:8080/static/default.jpg`} className='m-auto h-[150px] w-[150px]' alt="preview" width={150} height={150} />
                            }
                        </div>
                        <div className='ml-[50px] mt-[20px] w-[450px] basis-8/12'>
                            <div>
                                {product.title}
                            </div>
                            <div className='mt-[20px]'>
                                categorie : {product.category}
                            </div>
                            <div className='mt-[50px]'>
                                {product.price / 100}€
                            </div>
                        </div>
                        <div className='justify-self-end basis-1/12'>
                            <div className='mt-[10px] ml-[10px]' onClick={(value) => { deleteArticle(product._id, value.target.value, product.quantity) }}>
                                <img src="/src/app/assets/images/cross.png" alt="" srcset="" />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    className=" border border-2 border-magentacorner mr-4 w-[40px] text-black mt-[100px] mr-[10px]"
                                    name="number"
                                    value={numberProduct}
                                    onChange={(value) => { updateNumber(product._id, value.target.value, product.quantity) }}
                                />
                            </div>
                        </div>
                    </div>
                );
            }
        })

        return list

    };


    return (

        <div>
            {displayProducts()}
        </div>
    )
}


export default ProductSellers