
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'reactstrap';
import { search, searchCount } from '../../api/backend/requestApi';


import { } from '../../shared/constants/urls/urlConstants';
import { updateUser } from '../../shared/redux-store/authenticationSlice';
import PaginationList from './card/PaginationList';
import Product from './card/Product';




const ProductList = () => {


    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [numberPage, setNumberPage] = useState(0);
    const params = new URLSearchParams(location.search)








    useEffect(() => {

        var searchEntry = []
        searchEntry["search"] = params.get("search")
        searchEntry["page"] = page

        if (page < 1 || page > numberPage) setPage(1)
        


        if (searchEntry["search"] == "" || searchEntry["search"] == null) searchEntry["search"] = "all"
        if (searchEntry["page"] == "" || searchEntry["page"] == null) searchEntry["page"] = "1"
        console.log(searchEntry);
        search(searchEntry).then(

            function (res) {

                if (res.status === 200) {
                    console.log(res.data.message.productList)
                    setProducts(res.data.message.productList)
                    
                    searchCount(searchEntry).then(

                        function (res) {

                            if (res.status === 200) {
                                console.log(res.data.message.number)
                                setNumberPage(res.data.message.number)
                                


                            }
                        }
                    );


                }
            }
        );

    }, [page]);


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

                <div className="flex flex-wrap">{list}</div>
            </div>
        )


    }

    const displayPagination = () => {
       
            return (
                <PaginationList
                    page={page}
                    max={numberPage}
                    changePage = {changePage}
                    

                />
            );
       

       


    }

    const changePage = (number) => {
        console.log(number)
        setPage(number);
      };

    return (

        <div className='text-white'>

            <h1 className='font-bold text-2xl h-14 ml-[3.125rem] mb-[2.125rem]'>Nos Articles </h1>
            <div className='flex justify-around mt-8'>
                <div>
                    JEUX VIDEO
                </div>
                <div>
                    GOODIES
                </div>
                <div>
                    COMICS/MANGA
                </div>
                <div>
                    DVD/BLUE-RAY
                </div>
            </div>

            <div className='mt-20 flex ml-14'>
                <div className='w-[18.75rem] h-full bg-[grey]'>
                    <div>filtre</div>
                </div>
                <div>
                    {displayProducts()}
                    <div className='flex flex-end'>
                    {displayPagination()}
                    </div>
                </div>
            </div>

        </div>




    );
};

export default ProductList;
