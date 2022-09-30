import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { URL_PRODUCTLIST } from '../../shared/constants/urls/urlConstants';

const Search = () => {

    const [searchEntry, setSearchEntry] = useState("");
    const history = useHistory();
    const params = new URLSearchParams(location.search)
    const initialValues = {
        search: params.get("search"),
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
        <div className="search-container flex items-center">
            <div className=" search-inner flex items-center">
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        className=" border border-2 border-magentacorner mr-4 text-black"
                        name="search"
                        id="search"
                        value={search}
                        onChange={formik.handleChange}
                    />
                    <input type="submit" value="Recherche" className="border border-2 border-magentacorner px-5" />
                </form>
            </div>
        </div>   
    );
};

export default Search;
