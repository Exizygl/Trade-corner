import React, { useState } from 'react';
import { URL_PRODUCT } from '../../shared/constants/urls/urlConstants';

const Search = () => {
    

    // const onChange = (event) => {
    //     setValue(event.target.value);
    // };

    const onSearch = (searchTerm) => {
        navigate
        navigate(URL_PRODUCT + searchTerm, {replace: true});
        // console.log('search', searchTerm);
    };
    return (
        <div className="App">
            <div className="search-container">
                <div className="search-inner">
                    <form>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            
                        />
                        <button onClick={() => onSearch(value)} className="search">
                            {' '}
                            Rechercher{' '}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Search;
