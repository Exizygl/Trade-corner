
import React, { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNewProduct } from '../../api/backend/requestApi';
import { URL_PRODUCTLIST } from '../../shared/constants/urls/urlConstants';
import Product from './card/Product';
import { addProduct } from '../../shared/redux-store/panierSlice';

const Home = () => {

    const [products, setProducts] = useState([]);
    const dispactch = useDispatch()

    const addProductPanier = (e) => {
        console.log("(O-O)")
        
            const product = {
              id : e,
              number : 1
            }
      
            dispactch(addProduct(product))
            
        }

    useEffect(() => {
        getNewProduct().then(
            function (res) {
                console.log("la")
                if (res.status === 200) {
                    console.log(res.data.message.productList)
                    setProducts(res.data.message.productList)
                }
            }
        );

    }, []);


    const displayProducts = () => {
        
        const list = products.map(item => {
            
            return (
                <Product
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    price={item.price}
                    category={item.category}
                    image={item.imageProductUrl[0]}
                    addProduct={addProductPanier}
                />
            );
        });

        return (
            <div>
                <div className="flex">{list}</div>
            </div>
        )
    }

    return (

        <div>
            <h1 className=''>LES NOUVEAUTÉS </h1>
            <div className="text-center">
                {displayProducts()}
                <Link to={URL_PRODUCTLIST}>
                    <button className='btn-primary w-[300px]'>Voir plus</button>
                </Link>
            </div>   
        </div>
    );
};

export default Home;
