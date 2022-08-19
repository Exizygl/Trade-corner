import React from 'react';
import { Link } from 'react-router-dom';
import { URL_PRODUCT } from '../../../shared/constants/urls/urlConstants';
import './CardUser.css';



const PaginationList = ({page, max}) => {
    var number = [];

    for(var i = 1; i <= max; i++){
        number.push(i)
    }

    const list = number.map(item => {
        if(item == 1 || item == max)
        return (
            <div>{item}</div>
        );
        
        if(item == page && (item != 1 && item != max)){
            return (
                <div>{item}</div>
            );
        }
        
        if(item == page - 1 && item > 2 && (item != 1 && item != max)){
            return (
                <div className ="flex">
                <div>...</div>
                <div>{item}</div>
                </div>
            );
        }

        if(item == page + 1 && item < page - 2 && (item != 1 && item != max)){
            return (
                <div className ="flex">
                
                <div>{item}</div>
                <div>...</div>
                </div>
            );
        }
        
        })
    
    
    return (
      
        <div className="flex">
            <div> Prècedente </div>
            <div>{list}</div>
            <div> Suivant</div>
        </div>
      )
    }


export default PaginationList