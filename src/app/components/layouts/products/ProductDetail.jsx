import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../api/backend/requestApi';
import { URL_SHOP } from '../../../shared/constants/urls/urlConstants'

import CarouselImage from '../../../shared/components/CarouselImage';
import { Link, useHistory } from 'react-router-dom';
import { URL_MODIFYPRODUCT} from '../../../shared/constants/urls/urlConstants';



const ProductDetail = () => {

  // const userRole = useSelector((state) => state.auth.user.role);
  const user = useSelector((state) => state.auth.user);
 console.log(user);
  // console.log(userRole.label);
  // console.log({user.role}.label);

  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [seller, setSeller] = useState([]);
  const [date, setDate] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [loading, setLoading] = useState(0);
  const [userState, setUserState] = useState([]);
  const productDetail = product;

  const { id } = useParams();
  const sellerId = seller._id;
  

  useEffect(() => {

    getProduct(id).then(
      function (res) {
        if (res.status === 200) {
          setProduct(res.data.message.product)
          setCategory(res.data.message.product.categoryId)
          setSeller(res.data.message.product.sellerId)
          setDate(dateFormat(res.data.message.product.createdAt))
          setMainImage((res.data.message.product.imageProductUrl[0]))
          setLoading(1)
          setUserState(user)
        }
      }
    );

  }, []);

  const dateFormat = (date) => {
    return (date.slice(8, -14) + "/" + date.slice(5, -17) + "/" + date.slice(0, -20));
  }


  const changeImage = (number) => {
    setMainImage(number);
  };
  const displayCarousel = (imageList) => {
    if (loading == 0 || imageList.length < 2) return <div></div>
    // if (productDetail.imageProductUrl.length > 1) {

    //   var objectImage = productDetail.imageProductUrl.map((imageUrl, index) => ({ id: index + 1, value: str }))

    return (
      <CarouselImage
        imageList={imageList}
        changeImage={changeImage}
        mainImage={mainImage}
      />
    );

  }

  const displayButtonModify = () => {
       if (user.roleLabel === "admin" | user._id === sellerId) {
        return (<Link to={URL_MODIFYPRODUCT + id}>
          <button className='btn-primary mb-0 ml-5'>
          Modifier
          </button>
        </Link>)
       }
  }


  return (
    <div className='flex flex-wrap justify-around text-white'>
      <div id="images" className="w-11/12 mx-auto lg:w-5/12  ">
        {productDetail.imageProductUrl ?
        <img src={`http://localhost:8080/static/` + mainImage} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className=' object-contain object-top mx-auto mb-[25px] w-11/12 h-[525px]' alt="preview" width={200} height={200} />
        :
        <img src={`http://localhost:8080/static/default.jpg`} className='ml-[3.125rem] mt-[2.813rem] m-12 w-[33.125rem] h-[32.813rem]' alt="preview" width={200} height={200} />
        }
            {displayCarousel(productDetail.imageProductUrl)}
      </div>

      <div id ="informationProduit" className='w-11/12 lg:w-5/12 mt-[20px] lg:mt-0 mx-auto flex flex-col justify-between'>
          <div id="part1">
          <h1 className='mb-4'>{productDetail.title}</h1>
          <div className='font-normal text-[1.125rem] mb-8'>{category.label}</div>
          <p className='w-[47.75rem] font-normal leading-[1.75rem] text-[1rem]'>{productDetail.description}</p>
          </div>

          <div id="part2">
          <div className='flex items-end justify-between w-full mb-6'>
              <div className='font-bold text-[1rem] mr-4'>
                <p>Prix : <span className='font-normal text-[1.5rem] ml-[5px]'>{productDetail.price / 100}€</span></p>
              </div>
              <div className='font-bold text-[1rem] '>
                <p>Stock : <span className='font-normal text-[1.5rem] ml-[5px]'>{productDetail.quantity}</span></p>
              </div>
          </div>

          <div className='flex items-end justify-between w-full mb-6 font-bold'>
            <p>Vendu par :
                <Link to={URL_SHOP+sellerId}>
                  <span className="font-normal cursor-pointer hover:underline ml-[5px]">
                    {seller.pseudo}
                  </span>
                </Link>
              </p>
          </div>

          <div className='flex flex-wrap items-end justify-between w-full mb-6'>

            <div className='font-bold '>
            En ligne depuis le :<span className='font-normal text-[1.5rem] ml-[5px] '>{date}</span>
            </div>

            <div id="boutons">
              <button className=' mx-auto btn-primary mb-0'>
                Ajouter au panier
              </button>
              {displayButtonModify()}
            </div>
            
            
          </div>
          </div>
          

          
      </div>

    </div >
  )
}

export default ProductDetail;
