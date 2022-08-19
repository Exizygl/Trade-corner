
import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getNewProduct } from '../../api/backend/requestApi';
import { URL_PRODUCTLIST } from '../../shared/constants/urls/urlConstants';
import Product from './card/Product';


const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getNewProduct().then(
            function (res) {
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
