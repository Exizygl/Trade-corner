import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/backend/requestApi';

const ProductDetail = () => {

  const [product, setProduct] = useState([]);
  const productDetail = product;
  const category = productDetail.categoryId


  const { id } = useParams();


  useEffect(() => {
    console.log(id)
    getProduct(id).then(
      function (res) {

        if (res.status === 200) {
          setProduct(res.data.message.product)
          console.log(res.data.message.product)
          console.log(category)


        }
      }
    );

  }, []);

  return (
    <div>
      <div className='flex text-white'>
        {productDetail.imageProductUrl ?
          <img src={`http://localhost:8080/static/` + productDetail.imageProductUrl[0]} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className='ml-[3.125rem] mt-[2.813rem] m-12 w-[33.125rem] h-[32.813rem]' alt="preview" width={200} height={200} />
          :
          <img src={`http://localhost:8080/static/default.jpg`} className='ml-[3.125rem] mt-[2.813rem] m-12 w-[33.125rem] h-[32.813rem]' alt="preview" width={200} height={200} />
        }


        <div className='mt-10 w-[47.875rem]'>
          <h1 className='font-bold leading-[2.25rem] text-[1.5rem] mb-4'>{productDetail.title}</h1>
          <div className='font-normal text-[1.125rem] mb-8'>category</div>
          <p className='w-[47.75rem] font-normal leading-[1.75rem] text-[1rem]'>{productDetail.description}</p>


          <div className='mt-16 flex'>
            <div className='flex items-end justify-between w-full mb-6'>
              <div className='font-bold text-[1rem] mr-4'>
                Prix :

                <spam className='font-normal text-[1.5rem]'>
                  {productDetail.price / 100}€

                </spam>
              </div>
              <div className='font-bold text-[1rem] '>
                Stock :

                <spam className='font-normal text-[1.5rem]'>
                  {productDetail.quantity}

                </spam>
              </div>
            </div>

          </div>
          <div className='flex'>
            <div className='flex items-end justify-between w-full mb-6'>
              <div className='font-bold text-[1rem] mr-4'>
                Vendu par :

                <spam className='font-normal text-[1.5rem]'>
                  pseudo

                </spam>
              </div>
            </div>

          </div>

          <div className='flex'>
            <div className='flex items-end justify-between w-full mb-6'>
              <div className='font-bold text-[1rem] mr-4'>
                En ligne depuis le :

                <spam className='font-normal text-[1.5rem]'>
                  {productDetail.createdAt}

                </spam>
              </div>
              <div className='h-12 w-80 bg-[#53216C] font-bold text-[1rem] flex items-center justify-items-center'>
                <div className=' '>
                  Ajouter au panier
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail