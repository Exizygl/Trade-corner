import React from 'react';
import { useState, useEffect } from 'react';
import { getProduct, getProductsFrom } from '../../../api/backend/requestApi';
import { useParams } from 'react-router-dom';
import Product from '../card/Product';
import PaginationList from '../card/PaginationList';

const ProductsFromUser = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [numberPage, setNumberPage] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        getProductsFrom(id, page).then(function (res) {
            if (res.status === 200) {
                console.log(res.data.list.list)
                setProducts(res.data.list.list)
                setNumberPage(res.data.number.number)
            }
        });
    }, []);

    const displayProducts = () => {
        const list = products.map((item) => {
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

        const displayPagination = () => {
            return (
                <PaginationList
                    key={page}
                    page={page}
                    max={numberPage}
                    changePage={changePage}
                />
            );
        }
        const changePage = (number) => {
            setPage(number);
        };

        return (
            <div>
                <div className="flex flex-wrap justify-around">
                    {list}
                </div>
                <div className='flex justify-end mr-14 mb-16'>
                    {displayPagination()}
                </div>
            </div>

        );
    };

    return (
        displayProducts()
    );
};
export default ProductsFromUser;
