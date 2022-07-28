import React from 'react';
import {useEffect,useState} from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import storage from 'redux-persist/lib/storage';
import { store } from '../../../shared/redux-store/store';
import { validationAddProduct } from '../../../utils/Validation';
import SubmitRegisterModal from '.././modal/SubmitRegisterModal';
import { useParams, useHistory, Link } from 'react-router-dom';
import { URL_SELLER } from '../../../shared/constants/urls/urlConstants';


export default function AddProduct() {
  // storage.clear();

const products = useSelector(state => state.store.products); //je pointe sur le tableau products dans le store
const dispatch = useDispatch();

    // Variable

    const [successSubmitModal, setSuccessSubmitModal] = useState('');
    const closeModal = () => {
        setSuccessSubmitModal('');
    };

    // Formik

    const initialValues = {
        title: '',
        description: '',
        category: '',
        tags: '',
        price: '',
        quantity: '',
        photos: '',
    };

    const { handleSubmit, values, touched, isValid, handleChange, handleBlur, errors } =
        useFormik({
            initialValues,
            validationSchema : validationAddProduct,
            onSubmit,
        });

    function onSubmit(formValues) {
        console.log("submit");
        console.log(formValues);
    }


  return (
    <div className="flex flex-row ml-12">
        <div className = "border-solid border-2 basis-2/6">
            <Navigation/>
        </div> 

        <div className= " addProduct border-solid border-2 basis-4/6 "> 
            <form onSubmit={handleSubmit}>
                <h2>Ajouter un produit</h2>

{/* titre du produit */}
                <div>
                    <label htmlFor="title"> Titre : </label>
                    <input
                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Nom du produit"
                                    value={values.title}
                                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    <div>
                        {touched.title && errors.title ? (
                            <small>{errors.title}</small>
                            ) : (
                            ''
                        )}
                    </div>
                </div>

{/* catégorie du produit */}
                <div>
                    <label htmlFor="category">Catégorie : </label>
                    <select name="category"
                    value={values.category}
                    onChange={handleChange}>
                        <option value="" label="Choisir une catégorie">
                            Choisir une catégorie
                        </option>   
                    </select>
                    <div>
                        {touched.category && errors.category ? (
                                        <small>{errors.category}</small>
                        ) : (
                        ''
                        )}
                    </div>
                </div>

{/* Tags du produit */}
                <div>
                    <label htmlFor="tags">Tags : </label>
                    <input
                    type="text"
                    name="tags"
                    id="tags"
                    placeholder="ajouter des tags en les séparant par une virgule"
                    value={values.tags}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    <div>
                        {touched.tags && errors.tags ? (
                            <small>{errors.tags}</small>
                        ) : (
                         ''
                        )}
                    </div>
                </div>
{/* Description du produit */}
                <div>
                    <label htmlFor="description">Description : </label>
                    <textarea
                        name="description"
                        id="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ecrivez une description la plus compléte possible : taille du produit, état, couleur..."
                    />
                    <div>
                        {touched.description && errors.description ? (
                            <small>{errors.description}</small>
                        ) : (
                                    ''
                        )}
                    </div>
                </div>
{/* Prix du produit */}
                <div>
                    <label htmlFor="price">Prix : </label>
                    <input
                    type="number"
                    name="price"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    <div>
                        {touched.price && errors.price ? (
                            <small>{errors.price}</small>
                            ) : (
                                ''
                        )}
                    </div>
                </div>
{/* Stock du proudit */}

                <div>
                    <label htmlFor="quantity"> Stock : </label>
                    <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    <div>
                        {touched.quantity && errors.quantity ? (
                            <small>{errors.quantity}</small>
                            ) : (
                                ''
                            )}
                    </div>
                </div>

                    

                <div className="submit">
                    <button type="submit" className= "submit2">Ajouter un produit</button>
                    <Link to={URL_SELLER}><button className="submit2">Annuler</button></Link>
                </div>
            </form>
            
            {successSubmitModal}
        </div>
    </div>
    );
}