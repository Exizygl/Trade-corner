import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, getAllCategory, modifyProduct } from '../../../api/backend/requestApi';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, FormikConsumer, useFormik } from 'formik';
import { validationAddProduct } from '../../../utils/Validation';
import { URL_SELLER } from '../../../shared/constants/urls/urlConstants';
import Modal from '../modal/Modal';


const ModifyProduct = () => {

//-------INFORMATIONS PRODUIT---------
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [tagString, setTagString] = useState([]);
    const [seller, setSeller] = useState([]);
    const [date, setDate] = useState([]);
    const productDetail = product;
    const { id } = useParams();
  
    useEffect(() => {
    getProduct(id).then(
      function (res) {
        if (res.status === 200) {
          setProduct(res.data.message.product)
          setCategory(res.data.message.product.categoryId)
          setSeller(res.data.message.product.sellerId)
          setDate(dateFormat(res.data.message.product.createdAt))
          setTagList(res.data.message.product.tagIdList)
          let tagString = '';
          for (let i=0; i<res.data.message.product.tagIdList.length; i++) {
            tagString = tagString.concat(res.data.message.product.tagIdList[i].tag + ", ");
          }
          setTagList(res.data.message.product.tagIdList)
          setTagString(tagString)
        }
      }
    );
    getlistCategory();
   

  }, []);

 //-------MODIFICATIONS PRODUITS---------
  const [previewImages, setPreviewImages] = useState([]); //tableau d'URL pour preview d'images
  const [refreshPreview, setRefreshPreview] = useState(false); //pour rafraichir les previews
  const [imagesFiles, setImagesFiles]= useState([]); //tableau de files d'images pour l'envoi au back
  const [state, setState] = useState({ categories: [] });//récupération des catégories
  const history = useHistory();

 //-------GESTION MODAL------------------
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

  const dateFormat = (date) => { //afficher la date au format 11/11/2011
    return (date.slice(8, -14) + "/" + date.slice(5, -17) + "/" + date.slice(0, -20));
   }
 
   //récupérations des tags


   const renderPreviewTag = (source) => {
    return source.map((tag, index) => {
      return <div key={tag._id} className="relative mr-6 px-6 py-1 inline-block border border-solid border-2 border-magentacorner bg-white text-black text-sm">
        {tag.tag}
          <button type="button" className=" absolute -top-2 -right-2 h-5 w-5  rounded-full bg-redcorner text-white text-center" onClick={()=> deleteTag(index)}> X </button>
        </div>
    })}

  const products = useSelector(state => state.store.products); //je pointe sur le tableau products dans le store
  const dispatch = useDispatch();

// ----- FORMIK ------------

  const initialValues = {
        title: product.title,
        description: product.description,
        category: category.label,
        tags: '',
        price: product.price,
        quantity: product.quantity,
        photos: [],
  };

  const { handleSubmit, values, touched, isValid, handleChange, handleBlur, setFieldValue, errors } =
  useFormik({
    initialValues,
    // validationSchema : validationAddProduct,
    onSubmit,
    enableReinitialize: true, //pour permettre à formik de recharger les initialValues aprés le useEffect
  });

  const deleteFile = (e) => {//supprime l'image du tableau imagesFiles et supprime la preview
    const newFiles = imagesFiles.filter((photo,index) => index!== e);
    setImagesFiles(newFiles);
    setFieldValue("photos", newFiles, true);
    const newPreview = previewImages.filter((photo,index)=> index!==e);
    setPreviewImages(newPreview);
    setRefreshPreview(!refreshPreview);

  };

  const deleteTag = (e) => {//supprime le tag du tableau tagList et update tagString
    const newTags = tagList.filter((tag,index) => index!== e);
    setTagList(newTags);
    let newTagString = '';
    for (let i=0; i<newTags.length; i++) {
      newTagString = newTagString.concat(newTags[i].tag + ", ");
      console.log(newTagString);
    }
    setTagString(newTagString)
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
        formData.append('tags', tagString.concat(formValues.tags));
        formData.append('price', formValues.price*100);
        formData.append('quantity', formValues.quantity);

       console.log(formData.tags);
       console.log(category.label);
        
        modifyProduct(formData)
        .then ((res)=> {
          if(res.status === 200)
           {          
          setShowModal(true);
          }
          else {alert("error")}
        })
  }



  return (
    <div>
        <h1 className='font-bold leading-[2.25rem] text-[1.5rem] mb-4'>Modifier la fiche produit</h1>
        <div className= "w-11/12 lg:w-9/12 mx-12 gap-10 bg-darkgray text-white">
            <div id="info" className="flex flex-row flex-wrap justify-between text-white mb-6">
                <p>Nom du Vendeur : {seller.pseudo}</p>
                <p>Date de création du produit : {date}</p>
            </div> 
       

        <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
            

    {/* titre du produit */}   
            <div className="flex flex-row gap-3 content-center mt-5">
                <label htmlFor="title" className="basis-1/6 flex content-center"> Titre : </label>
                <div className="basis-5/6 mb-6">
                    <input
                    type="text"
                        name="title"
                        id="title"
                        className="input"
                        // placeholder="Nom du produit"
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
            <div className="basis-5/6 ">
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
                <div id="renderPreview" className="my-6">
                {renderPreview(previewImages)}
                </div> 
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
                        <div id="rendePreview" className="my-6">
                            {renderPreviewTag(tagList)}
                        </div>
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
                <button type="submit" className= " btn-primary w-[250px] ml-3">Modifier</button>
                <button type="button" onClick={() => alert("supprimer")} className= " btn-red w-[250px] ml-3">Supprimer</button>
                <Link to={URL_SELLER}><button className="btn-red w-[250px] ml-3 lg-ml-0">Annuler</button></Link>
            </div>
            </div>

        </form>
        {/* {successSubmitModal} */}
        <Modal message={msgModal} title={titleModal} showModal={showModal} closeModal={()=> closeModal}/>
        </div>
    </div>
  )
}

export default ModifyProduct