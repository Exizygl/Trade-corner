import React from 'react';
import {useEffect,useState} from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, FormikConsumer, useFormik } from 'formik';
import { validationAddProduct } from '../../../utils/Validation';
import { Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();

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
        formData.append('price', formValues.price*100);
        formData.append('quantity', formValues.quantity);
        
        addProduct(formData)
        .then ((res)=> {
          if(res.status === 200)
          {          alert("le produit a bien été ajouté");
          history.push(URL_SELLER);}
          else {alert("error")}
        })
  }


  return (
    <div className="flex flex-row mx-12 gap-10 bg-darkgray text-white">
      <div className = "basis-3/12">
        <Navigation/>
      </div> 

      <div className= "basis-9/12"> 
        <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
          <h2>Ajouter un produit</h2>

{/* titre du produit */}
                
          <div className="flex flex-row gap-3 content-center mt-5">
            <label htmlFor="title" className="basis-1/6 flex content-center"> Titre : </label>
            <div className="basis-5/6">
              <input
              type="text"
              name="title"
              id="title"
              className="input"
              placeholder="Nom du produit"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              
                {touched.title && errors.title ? (
                  <small>{errors.title}</small>
                  ) : (
                    ''
                  )}
              
            </div>
          </div>
                    
{/*photos*/}
          <div className="flex flex-row gap-3 content-center">
            <label htmlFor="photos" className="basis-1/6 flex content-center">Photos</label>
            <div className="basis-5/6">
              <input
                  id="photos"
                  type="file"
                  name="photos"
                  className="input"
                  accept='image/*'
                  multiple = "multiple"
                  onChange={(e) => loadImages(e)}
              />
              {touched.photos && errors.photos ? (
                <small>{errors.photos}</small>
                  ) : (
                    ''
                  )}
            </div>
          </div>

{/* catégorie du produit */}
          <div className="flex flex-row gap-3 content-center">
            <label htmlFor="category" className="basis-1/6 flex content-center">Catégorie : </label>
            <div className="basis-5/6">
              <select name="category" className="input"
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
          </div>

{/* Tags du produit */}
          <div className="flex flex-row gap-3 content-center">
            <label htmlFor="tags" className="basis-1/6 flex content-center">Tags : </label>
            <div className="basis-5/6">
              <input
                type="text"
                name="tags"
                id="tags"
                className="input"
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
          </div>

{/* Description du produit */}
          <div className="flex flex-row gap-3 content-center">
            <label htmlFor="description" className="basis-1/6 flex content-center">Description : </label>
            <div className="basis-5/6">
              <textarea
                name="description"
                id="description"
                className="input"
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
          </div>

{/* Prix du produit */}
          <div className="flex flex-row gap-3 content-center">
            <label htmlFor="price" className="basis-1/6 flex content-center">Prix : </label>
            <div className="basis-5/6">
              <input
                type="number"
                name="price"
                id="price"
                className="input"
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
          </div>
{/* Stock du produit */}

          <div className="flex flex-row gap-3 content-center">
            <label htmlFor="quantity" className="basis-1/6 flex content-center"> Stock : </label>
            <div className="basis-5/6">
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="input"
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
          </div>

          <div className="submit">
            <button type="submit" className= " btn-primary w-[300px] mr-5">Ajouter un produit</button>
            <Link to={URL_SELLER}><button className="btn-red">Annuler</button></Link>
          </div>
        </form>
        {successSubmitModal}
      </div>
    </div>
  );
};
