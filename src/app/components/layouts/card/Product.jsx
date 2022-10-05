import React from 'react';


import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { URL_PRODUCT } from '../../../shared/constants/urls/urlConstants';



const Product = ({id, title, price, image, sellerId}) => {

    const truePrice = price / 100 ;
    const user = useSelector((state) => state.auth.user);

    const displayButtonPanier = () => {
      if (user!== false & user.roleLabel === "admin" | user!== false & user._id === sellerId) {
        return (
          <div className='h-[50px] w-[50px] bg-grey mr-4 flex items-center'>
            <img className='object-contain object-center mx-auto' src="/src/app/assets/images/cart.png" alt="ajout au panier impossible" />
          </div>
        )
      }else {
        return(
          <div onClick={() => {addProduct(id)}} className='h-[50px] w-[50px] bg-purplecorner mr-4 flex items-center'>
            <img className='object-contain object-center mx-auto' src="/src/app/assets/images/cart.png" alt="ajouter au panier" />
          </div>
        )
      }
    }

    return (
        <div className="  w-[18.75rem] h-[26.875rem] mb-12 mx-auto">
          <Link to={URL_PRODUCT + id}>
          <div className="h-[17.625rem]">
            {image ?
              <img src={`http://localhost:8080/static/` + image} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className='m-auto w-[18.75rem] h-[17.625rem] object-cover' alt="preview" width={200} height={200} />
              :
              <img src={`http://localhost:8080/static/default.jpg`} className='m-auto w-[18.75rem] h-[17.625rem] object-cover' alt="preview" width={200} height={200} />
            }
          </div>
          <div className='bg-[#0F1219] h-[9.375rem] text-white font-bold' >
            <p className='text-lg h-14 ml-4 mb-3 pt-3.5'> {title} </p>
            
            <div className='flex justify-between'>
            <p className='text-2xl ml-4 pt-4'> {truePrice}€</p>
            {displayButtonPanier()}
            {/* <div onClick={() => {addProduct(id)}} className='h-[50px] w-[50px] bg-purplecorner mr-4 flex items-center'>
              <img className='object-contain object-center mx-auto' src="/src/app/assets/images/cart.png" alt="ajouter au panier" />
            </div> */}
            </div>
          </div>
          </Link>
        
         
        </div>
     

    
  )
}


export default Product