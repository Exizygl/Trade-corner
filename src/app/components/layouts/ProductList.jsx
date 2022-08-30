
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'reactstrap';
import { getAllSuperCategory, search, searchCount } from '../../api/backend/requestApi';
import Dropdown from '../../shared/components/DropDown';


import { } from '../../shared/constants/urls/urlConstants';
import { updateUser } from '../../shared/redux-store/authenticationSlice';
import PaginationList from './card/PaginationList';
import Product from './card/Product';




const ProductList = () => {


    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [numberPage, setNumberPage] = useState(0);
    const params = new URLSearchParams(location.search)
    const [superCategoryList, SetsuperCategoryList] = useState([])
    const [superCategory, setSuperCategory] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(0);
    const [dropDownJV, setDropDownJV] = useState(false)
    const [dropDownManga, setDropDownManga] = useState(false)
    const [dropDownGoodies, setDropDownGoodies] = useState(false)
    const [dropDownBR, setDropDownBR] = useState(false)








    useEffect(() => {

        getAllSuperCategory().then(

            function (res) {
                console.log(res.data.message.superCategoryList)
                if (res.status === 200) {
                    SetsuperCategoryList(res.data.message.superCategoryList);
                    setLoading(1)

                }
            })

        var searchEntry = []
        searchEntry["search"] = params.get("search")
        searchEntry["page"] = page
        searchEntry["superCategory"] = superCategory
        searchEntry["category"] = category
        console.log(searchEntry["superCategory"])
        if (page < 1 || page > numberPage) setPage(1)



        if (searchEntry["search"] == "" || searchEntry["search"] == null) searchEntry["search"] = "all"
        if (searchEntry["page"] == "" || searchEntry["page"] == null) searchEntry["page"] = 1
        if (searchEntry["superCategory"] == "" || searchEntry["superCategory"] == null) searchEntry["superCategory"] = "all"
        if (searchEntry["category"] == "" || searchEntry["category"] == null) searchEntry["category"] = "all"
        

        search(searchEntry).then(

            function (res) {

                if (res.status === 200) {
                    
                    setProducts(res.data.message.productList)

                    searchCount(searchEntry).then(

                        function (res) {

                            if (res.status === 200) {

                                setNumberPage(res.data.message.number)

                            }
                        }
                    );
                }
            }
        );

    }, [page, superCategory, category]);


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
                changePage={changePage}


            />
        );





    }

    const DropdownCategories = (number) => {

        if (loading != 0) {

            const list = superCategoryList[number].categoryIdList.map(item => {
                return (
                    <Dropdown
                        key={item._id}

                        label={item.label}

                        Category={ChangeCategory}


                    />
                );
            })
            return (
                <ul>
                    {list}
                </ul>
            );
        }
    }
    const changePage = (number) => {
        setPage(number);
    };
    const SuperCategory = (value) => {
        console.log(value)
        setPage(1);
        setSuperCategory(value);
        setCategory('')
    };
    const ChangeCategory = (value) => {
        console.log(value)
        setPage(1);
        setSuperCategory('');
        setCategory(value)
    };


    return (

        <div className='text-white'>

            <h1 className='font-bold text-2xl h-14 ml-[3.125rem] mb-[2.125rem]'>Nos Articles </h1>
            <div className='flex justify-around mt-8'>
                <div>
                    <div onMouseEnter={() => { setDropDownJV(true) }} onMouseLeave={() => { setDropDownJV(false) }} onClick={() => { SuperCategory("jeux video") }}>
                        JEUX VIDEO
                    </div>
                    {dropDownJV ? <div onMouseEnter={() => { setDropDownJV(true) }} onMouseLeave={() => { setDropDownJV(false) }} className=''>
                        {DropdownCategories(0)}
                    </div> : null}
                </div>
                <div>
                    <div onMouseEnter={() => { setDropDownGoodies(true) }} onMouseLeave={() => { setDropDownGoodies(false) }} onClick={() => { SuperCategory("goodies") }}>
                        GOODIES
                    </div>
                    {dropDownGoodies ? <div onMouseEnter={() => { setDropDownGoodies(true) }} onMouseLeave={() => { setDropDownGoodies(false) }} className=''>
                        {DropdownCategories(1)}
                    </div> : null}
                </div>
                <div>
                    <div onMouseEnter={() => { setDropDownManga(true) }} onMouseLeave={() => { setDropDownManga(false) }} onClick={() => { SuperCategory("comics-manga") }}>
                        COMICS/MANGA
                    </div>
                    {dropDownManga ? <div onMouseEnter={() => { setDropDownManga(true) }} onMouseLeave={() => { setDropDownManga(false) }} className=''>
                        {DropdownCategories(2)}
                    </div> : null}
                </div>
                <div>
                    <div onMouseEnter={() => { setDropDownBR(true) }} onMouseLeave={() => { setDropDownBR(false) }} onClick={() => { SuperCategory("DVD-Blu-Ray") }}>
                        DVD/BLUE-RAY
                    </div>
                    {dropDownBR ? <div onMouseEnter={() => { setDropDownBR(true) }} onMouseLeave={() => { setDropDownBR(false) }} className=''>
                        {DropdownCategories(3)}
                    </div> : null}
                </div>
            </div>

            <div className='mt-20 flex ml-14'>
                <div className='w-[18.75rem] h-full bg-[grey]'>
                    <div>filtre</div>
                </div>
                <div>
                    {displayProducts()}
                    <div className='flex justify-end mr-14 mb-16'>
                        {displayPagination()}
                    </div>
                </div>
            </div>

        </div>




    );
};

export default ProductList;
