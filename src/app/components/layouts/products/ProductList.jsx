
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Component } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllSuperCategory, search } from '../../../api/backend/requestApi';
import Dropdown from '../../../shared/components/DropDown';

import { updateUser } from '../../../shared/redux-store/authenticationSlice';
import { addProduct } from '../../../shared/redux-store/panierSlice';
import PaginationList from '../card/PaginationList';
import Product from '../card/Product';



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
    const [order, setOrder] = useState("new")
    const [minimunPrice, setMinimunPrice] = useState()
    const [maximunPrice, setMaximunPrice] = useState()

    var initialTag
    if (params.get("search") == "" || params.get("search") == null) {
        initialTag = []
    } else {
        initialTag = [params.get("search")]
    }

    const [tagList, setTagList] = useState(initialTag)
    const [tagEntry, setTagEntry] = useState("")
    const [tagReload, setTagReload] = useState(0)

    const  dispactch = useDispatch()


    useEffect(() => {
        getAllSuperCategory().then(
            function (res) {
                if (res.status === 200) {
                    SetsuperCategoryList(res.data.message.superCategoryList);
                    setLoading(1)
                }
            })

        var searchEntry = []
        searchEntry["search"] = tagList.toString()
        searchEntry["page"] = page
        searchEntry["superCategory"] = superCategory
        searchEntry["category"] = category
        searchEntry["order"] = order
        searchEntry["minimun"] = minimunPrice
        searchEntry["maximun"] = maximunPrice


        // if (page < 1 || page > numberPage) setPage(1)
        if (searchEntry["search"] == "" || searchEntry["search"] == null) searchEntry["search"] = "all"
        if (searchEntry["page"] == "" || searchEntry["page"] == null) searchEntry["page"] = 1
        if (searchEntry["superCategory"] == "" || searchEntry["superCategory"] == null) searchEntry["superCategory"] = "all"
        if (searchEntry["category"] == "" || searchEntry["category"] == null) searchEntry["category"] = "all"
        if (searchEntry["minimun"] == "" || searchEntry["minimun"] == null) searchEntry["minimun"] = 0
        if (searchEntry["maximun"] == "" || searchEntry["maximun"] == null) searchEntry["maximun"] = 100000000000


        search(searchEntry).then(
            function (res) {
                if (res.status === 200) {
                    setProducts(res.data.list.list)
                    setNumberPage(res.data.number.number)
                }
            }
        );

    }, [page, superCategory, category, order, minimunPrice, maximunPrice, tagList, tagReload]);


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
            <div className="flex flex-wrap gap-[20px] justify-between">{list}</div>
        )
    }

    const displayTags = () => {
        const selectTag = (e) => {
            removeTag(e)
        }
        const list = tagList.map(item => {
            if (item != null && item != "") {
                return (
                    <div className='border border-2 border-magentacorner bg-white mr-[25px] py-[5px] px-[10px] text-black' onClick={(value) => selectTag(value.target.textContent)}>{item}</div>
                );
            }
        });

        return (
            <div className="flex flex-wrap mt-[50px] ml-[29px]">{list}</div>
        )
    }

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
                <ul className='absolute z-50 bg-black w-[100px]'>
                    {list}
                </ul>
            );
        }
    }
    const changePage = (number) => {
        setPage(number);
    };

    const SuperCategory = (value) => {
        setPage(1);
        setSuperCategory(value);
        setCategory('')
    };

    const ChangeCategory = (value) => {
        setPage(1);
        setSuperCategory('');
        setCategory(value)
    };

    const ChangeOrder = (value) => {
        setPage(1);
        setOrder(value.target.value)
    };

    const ChangeMinimun = (value) => {
        setPage(1);
        setMinimunPrice(value.target.value)
    };

    const ChangeMaximun = (value) => {
        setPage(1);
        setMaximunPrice(value.target.value)
    };

    const AddTag = (e) => {
        if (tagEntry != "" && e.key === 'Enter') {
            setPage(1);
            setTagList(current => [...current, tagEntry])
            setTagEntry("")
        }
    };

    const removeTag = (e) => {
        var reloadNumber = tagReload
        setPage(1);
        var list = tagList
        var index = list.indexOf(e)
        list.splice(index, 1)
        setTagList(list)
        setTagReload(reloadNumber + 1)
    }

    const addProductPanier = (e) => {


        const product = {
            id: e,
            number: 1
        }
        
        dispactch(addProduct(product))
    }

    
    return (
        <div className='text-white'>

            <h1 onClick={() => { SuperCategory("") }} className='font-bold text-2xl h-14 ml-[3.125rem] mb-[2.125rem]'>Nos Articles </h1>
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

            {/* PAGE PRINCIPALE */}
            <div className='flex flex-row flex-wrap lg:flex-nowrap mt-8 gap-10 bg-darkgray text-white'>

                {/* NAVIGATION */}
                <div className='flex flex-col basis-11/12 lg:basis-3/12 h-full bg-black p-5'>

                    {/* Trier par */}
                    <div className='mt-[24px]'>Trier par :</div>
                    <select className='mt-[24px] text-black border border-2 border-magentacorner' onChange={(value) => { ChangeOrder(value) }}>
                        <option value="new">Les plus récents</option>
                        <option value="old">Les plus anciens</option>
                        <option value="cheap">Les moins chers</option>
                        <option value="expensive">Les plus chers</option>
                    </select>

                    {/* filtres */}
                    <div className='mt-[50px]'>Filtre :</div>
                    <div className='mt-[20px]'>
                        de
                        <input
                            type="text"
                            className=" border border-2 border-magentacorner mr-4 text-black w-[40px] ml-[10px] mr-[5px]"
                            name="minimumPrice"
                            onChange={(value) => ChangeMinimun(value)}
                        />
                        € à
                        <input
                            type="text"
                            className=" border border-2 border-magentacorner mr-4 text-black w-[40px] ml-[10px] mr-[5px]"
                            name="minimumPrice"
                            onChange={(value) => ChangeMaximun(value)}
                        />
                        €
                    </div>

                    {/* Tags */}

                    <div className='mt-[50px]'>Tags :</div>
                    {displayTags()}
                    <div>
                        <input
                            type="text"
                            className=" border border-2 border-magentacorner mr-4 text-black mt-[50px] mb-[195px]"
                            name="tag"
                            value={tagEntry}
                            onChange={(value) => setTagEntry(value.target.value)}
                            onKeyDown={AddTag}
                        />
                    </div>
                </div>

                {/* LISTE DES PRODUITS */}
                <div className="flex flex-col basis-11/12 lg:basis-9/12">
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
