import React from 'react';
import {useEffect,useState} from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { store } from '../../../shared/redux-store/store';


export default function MaBoutique() {
  // storage.clear();

const products = useSelector(state => state.store.products); //je pointe sur le tableau products dans le store
const commandes = useSelector (state => state.store.commandes);

const dispatch = useDispatch();


  return (
    <div className="flex flex-row ml-12">
        <div className = "border-solid border-2 basis-2/6">
            <Navigation/>
        </div> 
        <div className= "border-solid border-2 basis-4/6 "> 
            <h2>Ma Boutique</h2>

            <h3> Notifications </h3>
            { commandes.length ===0  && <p>Vous n'avez pas de commandes en cours</p>}
            <h3> Mes produits en ventes </h3>
            { products.length ===0 && <p>Vous n'avez pas encore de produits en vente</p>}
            {/* componant list preview */}
        </div> 
    </div>
  )
}