import React from 'react';
import {useEffect,useState} from 'react';
import Navigation from './Navigation';
import Modal from '../modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, FormikConsumer, useFormik } from 'formik';
import { validationAddProduct } from '../../../utils/Validation';
import { Link, useHistory } from 'react-router-dom';
import { URL_SELLER } from '../../../shared/constants/urls/urlConstants';
import { addProduct, getAllCategory} from '../../../api/backend/requestApi';


export default function AddProduct() {

  const [previewImages, setPreviewImages] = useState([]); //tableau d'URL pour preview d'images
  const [refreshPreview, setRefreshPreview] = useState(false); //pour rafraichir les previews
  const [imagesFiles, setImagesFiles]= useState([]); //tableau de files d'images pour l'envoi au back
  const [state, setState] = useState({ categories: [] });
  const history = useHistory();

     //Gestion Modal
     const [showModal, setShowModal] = useState(false);
     const msgModal = "Un administrateur va lire et valider votre annonce rapidement";
     const titleModal= "Votre produit a bien été enregistré";
     const closeModal = () => {
         setShowModal(false);
         history.push(URL_SELLER);
     };

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

    // ----- FORMIK ------------

  const initialValues = {
        title: '',
        description: '',
        category: '',
        tags: '',
        price: '',
        quantity: '',
        photos: [],
  };

  const { handleSubmit, values, touched, isValid, handleChange, handleBlur, setFieldValue, errors } =
  useFormik({
    initialValues,
    validationSchema : validationAddProduct,
    onSubmit,
  });

  const deleteFile = (e) => {//supprime l'image du tableau imagesFiles et supprime la preview
    const newFiles = imagesFiles.filter((photo,index) => index!== e);
    setImagesFiles(newFiles);
    setFieldValue("photos", newFiles, true);
    const newPreview = previewImages.filter((photo,index)=> index!==e);
    setPreviewImages(newPreview);
    setRefreshPreview(!refreshPreview);

  };

  const renderPreview = (source) => {
    return source.map((photo, index) => {
      return <div key={photo} className="relative mr-6 inline-block border border-solid border-2 border-magentacorner">
          <img src={photo} className="object-contain  w-[100px] h-[100px]"/>
          <button type="button" className=" absolute -top-2 right-0 h-5 w-5  rounded-full bg-redcorner text-white text-center" onClick={()=> deleteFile(index)}> X </button>
        </div>
    })
  };

  const handleChangeImage = (e) => {
    
    // //etape 1 : afficher la preview
    const filesArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file));
    setPreviewImages((prevImages) => prevImages.concat(filesArray));

    //etape 2 : modifier imagesFiles (state)
    const newFiles = [];
    for(let i = 0; i < e.target.files.length; i++){
        newFiles.push(e.target.files[i]); 
    }
    setImagesFiles((imagesFiles) => imagesFiles.concat(newFiles));

    //etape 3 : modifier formValues pour la validation
    const newTruc =[];
    for (let j=0; j <e.target.files.length; j++){
      newTruc.push(e.target.files[j]);
    }
  setFieldValue("photos",values.photos.concat(newTruc),true);
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
           {          
          setShowModal(true);
          }
          else {alert("error")}
        })
  }


  return (
    <div className="">
    <h1>Ajouter un produit</h1>
    <div className="flex flex-row flex-wrap lg:flex-nowrap gap-10 bg-darkgray text-white">
      
      <div className = "basis-11/12 lg:basis-3/12">
        <Navigation/>
      </div> 

      <div className= "basis-11/12 lg:basis-9/12"> 
        <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">

          {/*photos*/}
          <div className="flex flex-row gap-3 content-center">
            <label htmlFor="photos : " className="basis-1/6 flex content-center">Photos</label>
            <div className="basis-5/6">
              <input
                  id="photos"
                  type="file"
                  name="photos"
                  className="input"
                  accept='image/*'
                  multiple = "multiple"
                  onChange={(e) =>{handleChangeImage(e)}}
              />
              <div className="text-xs p-1"> Importez jusqu'à 5 photos maximum</div>
              {touched.photos && errors.photos ? (
                <small>{errors.photos}</small>
                  ) : (
                    ''
                  )}
              <div id="rendePreview" className="my-6">
                {renderPreview(previewImages)}
              </div> 
            </div>
          </div>
          

{/* titre du produit */}
                
          <div className="flex flex-row gap-3 content-center mt-5">
            <label htmlFor="title" className="basis-1/6 flex content-center"> Titre : </label>
            <div className="basis-5/6 mb-6">
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
                    


          
{/* catégorie du produit */}
          <div className="flex flex-row gap-3 content-center">
            <label htmlFor="category" className="basis-1/6 flex content-center">Catégorie : </label>
            <div className="basis-5/6 mb-6">
              <select name="category" className="select-corner"
                value={values.category}
                onChange={handleChange}>
                <option value="" label="Choisir une catégorie" className="text-magentacorner">
                    {/* Choisir une catégorie */}
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
            <div className="basis-5/6 mb-6">
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
            <div className="basis-5/6 mb-6">
              <textarea
                name="description"
                id="description"
                className="input h-[200px]"
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
            <div className="basis-5/6 mb-6">
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
            <div className="basis-5/6 mb-6">
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

          <div className="submit flex flex-col md:flex-row flex-wrap">
            <div className=" basis-1/6 mb-6">
            </div>
            <div className="basis-5/6 mb-6 flex flex-wrap justify-between">
              <button type="submit" className= " btn-primary w-[400px] ml-3">Ajouter un produit</button>
              <Link to={URL_SELLER}><button className="btn-red w-[400px] ml-3 lg-ml-0">Annuler</button></Link>
            </div>
          </div>
          
        </form>
        {/* {successSubmitModal} */}
        <Modal message={msgModal} title={titleModal} showModal={showModal} closeModal={()=> closeModal}/>
      </div>
    </div>
    </div>
  );
};
