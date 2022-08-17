import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { URL_PRODUCTLIST } from '../../shared/constants/urls/urlConstants';

const Search = () => {

    const [searchEntry, setSearchEntry] = useState("");
    const history = useHistory();
    
    const initialValues = {
        search: '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            if(!values.search) history.push(URL_PRODUCTLIST)
            history.push(URL_PRODUCTLIST + "?search=" + values.search);
            if(window.location.pathname == URL_PRODUCTLIST) window.location.reload(true)

        }

    });

    const { search } = formik.values;

    return (
        <div className="App">
            <div className="search-container">
                <div className="search-inner">
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={search}
                            onChange={formik.handleChange}

                        />
                        <input type="submit" value="Recherche" className="search" />


                    </form>
                </div>
            </div>
        </div>
    );
};

export default Search;
