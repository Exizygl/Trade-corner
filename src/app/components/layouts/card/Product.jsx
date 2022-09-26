import React from 'react';


import { Link } from 'react-router-dom';
import { URL_PRODUCT } from '../../../shared/constants/urls/urlConstants';


import './CardUser.css';





const Product = ({id, title, price, image, addProduct}) => {
    
    const truePrice = price / 100 ;
    return (
      
        <div className=" cardUser w-[18.75rem] h-[26.875rem] ml-[2.8125rem] mb-12">
          {/* <Link to={URL_PRODUCT + id}> */}
          <div className="h-[17.625rem]">
            {image ?
              <img src={`http://localhost:8080/static/` + image} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className='m-auto w-[18.75rem] h-[17.625rem]' alt="preview" width={200} height={200} />
              :
              <img src={`http://localhost:8080/static/default.jpg`} className='m-auto w-[18.75rem] h-[17.625rem]' alt="preview" width={200} height={200} />
            }
          </div>
          <div className='bg-[#0F1219] h-[9.375rem] text-white font-bold' >
            <p className='text-lg h-14 ml-4 mb-3 pt-3.5'> {title} </p>
            
            <div className='flex justify-between'>
            <p className='text-2xl ml-4 pt-4'> {truePrice}€</p>
            <div onClick={() => {addProduct(id)}} className='h-[3.125rem] w-[3.125rem] bg-purplecorner rounded-[0.188rem] mr-4'><img src="/src/app/assets/images/cart.png" alt="" srcset="" /></div>
            </div>
          </div>
          {/* </Link> */}
        </div>
      )
    }


export default Product