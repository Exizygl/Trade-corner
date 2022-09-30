import React from 'react';
import {useEffect,useState} from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { store } from '../../../shared/redux-store/store';


export default function ListProducts() {
  // storage.clear();

const products = useSelector(state => state.store.products); //je pointe sur le tableau products dans le store

const dispatch = useDispatch();

// useEffect( () => {
//   // getAllProducts(userId) //j'appelle l'api 
//   // .then (
//   //   function (res) {
//   //     if (res.status === 200) {
//   //       let usersTemp = [];
//   //       for (let i=0; i<res.data.length; i++) { 
//   //         let name= res.data[i].name;
//   //         let id = res.data[i]._id;
//   //         let role = res.data[i].role;
//   //         let imageProfilUrl = res.data[i].imageProfilUrl;
//   //         let user = {name : name, id: id, role : role, imageProfilUrl :  imageProfilUrl};
//   //         usersTemp.push(user);      //j'ai récup les données que je voulais
//   //       };    
//   //       dispatch(setListProducts(usersTemp));//je transfere le tableau au store
//   //     }
//   //   }
//   // )



// }
//   ,[]
// )


  return (
    <div className="">
    <h1>Mes produits</h1>
    <div className="flex flex-row flex-wrap lg:flex-nowrap gap-10 bg-darkgray text-white">
      <div className = "basis-11/12 lg:basis-3/12">
        <Navigation/>
      </div> 

        <div className= "basis-11/12 lg:basis-9/12"> 
            { products.length ===0 && <p>Vous n'avez pas encore de produits en vente</p>}
            {/* componant list */}
        </div> 
    </div>
    </div>
  )
}