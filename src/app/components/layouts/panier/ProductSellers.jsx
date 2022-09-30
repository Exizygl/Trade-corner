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

                    <div className='bg-black w-[885px] h-[250px] flex text-white'>
                        <div className="h-[150px] w-[150px]">
                            {product.imageProductUrl[0] ?
                                <img src={`http://localhost:8080/static/` + product.imageProductUrl[0]} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className='m-auto h-[150px] w-[150px]' alt="preview" width={150} height={2150} />
                                :
                                <img src={`http://localhost:8080/static/default.jpg`} className='m-auto h-[150px] w-[150px]' alt="preview" width={150} height={150} />
                            }
                        </div>
                        <div>
                            <div>
                                {product.title}
                            </div>
                            <div>
                                categorie : {product.category}
                            </div>
                            <div>
                                {product.price / 100}€
                            </div>
                        </div>
                        <div onClick={(value) => { deleteArticle(product._id, value.target.value, product.quantity) }}>
                            cross
                        </div>
                        <div>
                            <input
                                type="number"
                                className=" border border-2 border-magentacorner mr-4 text-black ml-[29px] mt-[50px] mb-[195px]"
                                name="number"
                                value={numberProduct}
                                onChange={(value) => { updateNumber(product._id, value.target.value, product.quantity) }}
                            />
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