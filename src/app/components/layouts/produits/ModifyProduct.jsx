import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, getAllCategory, modifyProduct } from '../../../api/backend/requestApi';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, FormikConsumer, useFormik } from 'formik';
import { validationModifyProduct } from '../../../utils/Validation';
import { URL_SELLER, URL_PRODUCT } from '../../../shared/constants/urls/urlConstants';
import Modal from '../modal/Modal';
import ModalAction from '../modal/ModalAction';


const ModifyProduct = () => {

//-------INFORMATIONS PRODUIT---------
    const [load, setLoad] = useState(false);// pour récupérer les infos necessaires avant d'afficher la page
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [tagString, setTagString] = useState([]);
    const [totalPhotos, setTotalPhotos]= useState([]);
    const { id } = useParams();
   
    useEffect(() => {
    getProduct(id).then(
      function (res) {
        if (res.status === 200) {
          setProduct(res.data.message.product)
          setCategory(res.data.message.product.categoryId)        
          let tagString = '';
          for (let i=0; i<res.data.message.product.tagIdList.length; i++) {
            tagString = tagString.concat(res.data.message.product.tagIdList[i].tag + ", ");
          }
          setTagString(tagString)
          setTotalPhotos(res.data.message.product.imageProductUrl.length)
          setLoad(true)
        }
        else alert("Nous n'avons pas pu retrouver le produit dans notre BDD")
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
  const msgModal = "Un administrateur va lire et valider vos modifications rapidement";
  const titleModal= "Votre produit a bien été modifié";
  const closeModal = () => {
    setShowModal(false);
    history.push(URL_PRODUCT+id);
  };

  const [showModalDelete, setShowModalDelete] = useState(false);
  const msgModalDelete = " Cette décision est définitive.";
  const titleModalDelete= "Etes-vous sûr(e) de vouloir supprimer ce produit ?";
  const closeModalDelete= () => {
    setShowModalDelete(false);
  };
  const deleteProduct=() => {
    alert("produit supprimé");
    history.push(URL_SELLER);
  }

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
 
//previews des tags récupérés
   const renderPreviewTag = (source) => {
    return source.map((tag, index) => {
      return <div key={tag._id} className="relative mr-6 px-6 py-1 inline-block border border-solid border-2 border-magentacorner bg-white text-black text-sm">
        {tag.tag}
          <button type="button" className=" absolute -top-2 -right-2 h-5 w-5  rounded-full bg-redcorner text-white text-center" onClick={()=> deleteTag(index)}> X </button>
        </div>
    })}
//preview des images récupérées
  const renderPreviewImageUrl = (source)=> {
    return source.map((url, index)=> {
      return <div key={url} className="relative mr-6 inline-block border border-solid border-2 border-magentacorner">
      <img src={`http://localhost:8080/static/` + url} className="object-contain  w-[100px] h-[100px]"/>
      <button type="button" className=" absolute -top-2 right-0 h-5 w-5  rounded-full bg-redcorner text-white text-center" onClick={()=> deleteImageUrl(index)}> X </button>
      </div>
    })
  };
//preview des nouvelles images
  const renderPreview = (source) => {
    return source.map((photo, index) => {
      return <div key={photo} className="relative mr-6 inline-block border border-solid border-2 border-magentacorner">
          <img src={photo} className="object-contain  w-[100px] h-[100px]"/>
          <button type="button" className=" absolute -top-2 right-0 h-5 w-5  rounded-full bg-redcorner text-white text-center" onClick={()=> deleteFile(index)}> X </button>
        </div>
    })
  };  

// ----- FORMIK ------------

  const initialValues = {
        title: product.title,
        description: product.description,
        category: category.label,
        tags: '',
        price: product.price/100,
        quantity: product.quantity,
        photos: [],
        photosNumber:totalPhotos,
  };

  const { handleSubmit, values, touched, isValid, handleChange, handleBlur, setFieldValue, errors } =
  useFormik({
    initialValues,
    validationSchema : validationModifyProduct,
    onSubmit,
    enableReinitialize: true, //pour permettre à formik de recharger les initialValues aprés le useEffect
  });

  const deleteFile = (e) => {//supprime l'image du tableau imagesFiles, update photonumber et supprime la preview
    const newFiles = imagesFiles.filter((photo,index) => index!== e);
    setImagesFiles(newFiles);
    setFieldValue("photos", newFiles, true);
    const photoNumber = newFiles.length + product.imageProductUrl.length;
    setFieldValue("photosNumber", photoNumber);
    const newPreview = previewImages.filter((photo,index)=> index!==e);
    setPreviewImages(newPreview);
    setRefreshPreview(!refreshPreview);
  };

const deleteImageUrl = (e) => {//supprime l'url de ImageProductUrl, update photoNumber et supprime la preview
  const newImageProductUrl = product.imageProductUrl.filter((photo,index) => index!==e);
  setProduct({...product, imageProductUrl: newImageProductUrl});
  const photoNumber = imagesFiles.length + newImageProductUrl.length;
    setFieldValue("photosNumber", photoNumber);
}

  const deleteTag = (e) => {//supprime le tag du tableau tagList et update tagString
    const newTags = product.tagIdList.filter((tag,index) => index!== e);
    setProduct({...product, tagIdList: newTags});
    let newTagString = '';
    for (let i=0; i<newTags.length; i++) {
      newTagString = newTagString.concat(newTags[i].tag + ", ");
    }
    setTagString(newTagString)
  };

  const handleChangeImage = (e) => {
    
    // //etape 1 : afficher la preview
    const filesArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file));
    setPreviewImages((prevImages) => prevImages.concat(filesArray));

    //etape 2 : modifier imagesFiles (state) et formValues pour la validation
    const newFiles = [];
    for(let i = 0; i < e.target.files.length; i++){
        newFiles.push(e.target.files[i]); 
    }
    setImagesFiles((imagesFiles) => imagesFiles.concat(newFiles));
    setFieldValue("photos",values.photos.concat(newFiles),true);

    //etape 3 : update photoNumber
    const photosNumber = imagesFiles.length+newFiles.length+product.imageProductUrl.length;
    setFieldValue("photosNumber", photosNumber);
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
        formData.append('imageProductUrl', product.imageProductUrl);
     
        modifyProduct(formData)
        .then ((res)=> {
          if(res.status === 200)
           {          
          setShowModal(true);
          console.log("envoie au back")
          }
          else {alert("error")}
        })
  }

  // AJOUTER UNE CONDITION POUR QUE SEULS LES UTILISATEURS VOULU VOIENT LA PAGE
  // if()
  // {return <div><h1 className='font-bold leading-[2.25rem] text-[1.5rem] mb-4'>Vous n'avez pas les autorisations pour accéder à cette page</h1></div>}

  if(!load)
  {return <div><h1>Téléchargement</h1></div>}

   return (   
    <div className="px-3 md:px-10 text-white">
        <h1>Modifier la fiche produit</h1>
        <div className= "w-11/12 xl:w-9/12 mx-auto gap-10 bg-darkgray text-white ">
            <div id="info" className="flex flex-row flex-wrap justify-between text-white mb-6">
                <p>Nom du Vendeur : <span className="!uppercase">{product.sellerId.pseudo}</span></p>
                <p>Date de création du produit : {dateFormat(product.createdAt)}</p>
            </div> 
        <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
            
    {/* titre du produit */}   
          <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 content-center mt-5">
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
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 content-center">
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
                  {touched.photos && errors.photosNumber ? (
                <small>{errors.photosNumber}</small>
                    ) : (
                    ''
                    )}
                <div id="renderPreview" className="my-6">
                {renderPreview(previewImages)}
                {renderPreviewImageUrl(product.imageProductUrl)} 
                </div> 
            </div>
            </div>
            
    {/* catégorie du produit */}
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 content-center">
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
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 content-center">
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
                            {renderPreviewTag(product.tagIdList)}
                        </div>
                    </div>
                </div>
            </div>

    {/* Description du produit */}
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 content-center">
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
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 content-center">
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
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 content-center">
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

    {/* BOutons */}
            <div className="submit flex flex-col md:flex-row flex-wrap mt-[40px]">
              <div className=" basis-1/6 mb-6">
              </div>
              <div className="basis-5/6 mb-6 flex flex-wrap justify-between">
                  <button type="submit" className= " btn-primary w-[250px] ml-3">Modifier</button>
                  <button type="button" onClick={() => setShowModalDelete(true)} className= " btn-red w-[250px] ml-3">Supprimer</button>
                  <Link to={URL_PRODUCT+id}><button className="btn-red w-[250px] ml-3 lg-ml-0">Annuler</button></Link>
              </div>
            </div>

        </form>
        <Modal message={msgModal} title={titleModal} showModal={showModal} closeModal={()=> closeModal}/>
        <ModalAction message={msgModalDelete} title={titleModalDelete} showModal={showModalDelete} closeModal={()=>closeModalDelete} action="Supprimer" doAction={()=>deleteProduct}/>
      </div>
    </div>
  )
}

export default ModifyProduct