import React from 'react';
import {useEffect,useState} from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, FormikConsumer, useFormik } from 'formik';
import { validationAddProduct } from '../../../utils/Validation';
import { Link } from 'react-router-dom';
import { URL_SELLER } from '../../../shared/constants/urls/urlConstants';
import { addProduct, getAllCategory} from '../../../api/backend/requestApi';
import { findImageExtension, validImageSize } from '../../../shared/components/utils-components/FormData';
import ErrorMessSmall from '../../../shared/components/form-and-error-components/ErrorMessSmall';


export default function AddProduct() {
  // storage.clear();
  const [userImageValue, setUserImageValue] = useState("");
  const [errorSizeImage, setErrorSizeImage] = useState("");
  const [errorExtensionImage, setErrorExtensionImage] = useState("");
  const [state, setState] = useState({ categories: [] });

//---------FONCTIONS --------------

  const getlistCategory =  () => {
    getAllCategory() //j'appelle l'api 
    .then (
      function (res) {
        if (res.status === 200) {
          let resCategories = res.data.message.categoryList ;
          let categories = [];
          for (let i=0; i<resCategories.length; i++) { 
            let label = resCategories[i].label;
            let id = i;
            let category = { 
              label : label ,
              id : id
            }
            categories.push(category);  //j'ai récup la liste des categories
          };
          setState((state) => ({
            categories: [...state.categories, ...categories],
        }));           
        }
      }
    )
  };



  useEffect( () => {
    getlistCategory();
  }
    ,[]
  )

  const products = useSelector(state => state.store.products); //je pointe sur le tableau products dans le store
  const dispatch = useDispatch();


    // Variable

  const [successSubmitModal, setSuccessSubmitModal] = useState('');
  const closeModal = () => {
        setSuccessSubmitModal('');
  };

    // ----- FORMIK ------------

  const initialValues = {
        title: '',
        description: '',
        category: '',
        tags: '',
        price: '',
        quantity: '',
        photos: '',
  };

  const { handleSubmit, values, touched, isValid, handleChange, handleBlur, setFieldValue, errors } =
  useFormik({
    initialValues,
    validationSchema : validationAddProduct,
    onSubmit,
  });

//   const checkValidImages = (e) => {

//     for (let i=0; i<e.currentTarget.files; i++)
//     {
//     const extension = findImageExtension(e.currentTarget.files[i].name)
//     if (!extension) {
//         setErrorExtensionImage(`L'extension d'image doit être jpg, jpeg ou png`)
//     } else setErrorExtensionImage("");

//     const imageSize = validImageSize(e.currentTarget.files[i].size)
//     if (!imageSize) {
//         setErrorSizeImage(`Le poids de l'image ne doit pas dépasser 200 Ko`)
//     } else setErrorSizeImage("");
//     }
//   }

  const loadImages = (e) => {
    // checkValidImages(e);
    
    const newFiles = []
    for(let i = 0; i < e.target.files.length; i++){
        
        newFiles.push(e.target.files[i]); 
    }
    setFieldValue('photos',newFiles);
  }

  function onSubmit(formValues) {

        const formData = new FormData();

        for (let i=0; i <formValues.photos.length; i++){
            formData.append('photos', formValues.photos[i]); //on envoie chaque file avec la key "photos"
        };
        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
        formData.append('category', formValues.category);
        formData.append('tags', formValues.tags);
        formData.append('price', formValues.price);
        formData.append('quantity', formValues.quantity);
        
        addProduct(formData)
  }


  return (
    <div className="flex flex-row ml-12">
        <div className = "border-solid border-2 basis-2/6">
            <Navigation/>
        </div> 

        <div className= " addProduct border-solid border-2 basis-4/6 "> 
            <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
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
{/*photos*/}
                <label htmlFor="photos">Photos</label>
                <div>
                    <input
                        id="photos"
                        type="file"
                        name="photos"
                        accept='image/*'
                        multiple = "multiple"
                        onChange={(e) => loadImages(e)}
                    />
                    {touched.photos && errors.photos ? (
                            <small>{errors.photos}</small>
                        ) : (
                         ''
                        )}

                                {/* {userImageValue && <div> <p>Image chargée</p> <PreviewUserImage file={userImageValue} /> </div>} */}
                               

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
                        {state.categories.map( category => 
                        <option value={category.label} key = {category.id}> {category.label}</option>
                    )}
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
                            };
