import React from 'react';
import { Link } from 'react-router-dom';
import { URL_PRODUCT } from '../../../shared/constants/urls/urlConstants';
import './CardUser.css';



const PaginationList = ({ page, max, changePage }) => {
    var number = [];

    for (var i = 1; i <= max; i++) {
        number.push(i)
    }

    const list = number.map(item => {
        if (item == 1 || item == max)
            return (
                <button className='btn-page-primary' onClick={() => {

                    changePage(item);
                }}>{item}</button>
            );

        if (item == page && (item != 1 && item != max)) {
            return (
                <button className='btn-page-primary' onClick={() => {

                    changePage(item);
                }}>{item}</button>
            );
        }

        if (item == page - 1 && item == 2 && (item != 1 && item != max)) {
            return (
                <div className="flex">
                    <button className='btn-page-primary' onClick={() => {
                        changePage(item)
                    }}>{item}</button>
                </div>
            );
        }

        if (item == page - 1 && item > 2 && (item != 1 && item != max)) {
            return (
                <div className="flex">
                    <div className='mx-[6px]'>...</div>
                    <button className='btn-page-primary'onClick={() => {
                        changePage(item)
                    }}>{item}</button>
                </div>
            );
        }

        if (item == page + 1 && item < max - 1 && (item != 1 && item != max)) {
            return (
                <div className="flex">

                    <button className='btn-page-primary' onClick={() => {
                        changePage(item)
                    }}>{item}</button>
                    <div className='mx-[6px]'>...</div>
                </div>
            );
        }
        
        if (item == page + 1 && item == max - 1 && (item != 1 && item != max)) {
            return (
                <div className="flex">

                    <button className='btn-page-primary' onClick={() => {
                        changePage(item)
                    }}>{item}</button>
                   
                </div>
            );
        }

    })



    return (

        <div className="flex">
            <button className='btn-primary mx-auto' onClick={() => {
                        changePage(page - 1)
                    }}> Prècedente </button>
            <div className="flex">{list}</div>
            <button className='btn-primary mx-auto' onClick={() => {
                        changePage(page + 1)
                    }}> Suivant</button>
        </div>
    )

    
}


export default PaginationList