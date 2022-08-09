import React, { useState } from 'react';

const Search = () => {
    const { value, setValue } = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
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
                            value={value}
                            onChange={onChange}
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
