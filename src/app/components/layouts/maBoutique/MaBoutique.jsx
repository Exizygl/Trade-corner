import React from 'react';
import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { store } from '../../../shared/redux-store/store';


export default function MaBoutique() {
  // storage.clear();

  const products = useSelector(state => state.store.products); //je pointe sur le tableau products dans le store
  const commandes = useSelector(state => state.store.commandes);
  const [page, setPage] = useState(1);
  const [numberPage, setNumberPage] = useState(0);

  const dispatch = useDispatch();

  return (
    <div className="">
      <h1>Ma boutique</h1>
      <div className="flex flex-row flex-wrap lg:flex-nowrap  gap-10 bg-darkgray text-white">
        <div className="basis-11/12 lg:basis-3/12">
          <Navigation />
        </div>


        <div className="basis-11/12 lg:basis-9/12">
          <h2> Notifications </h2>
          {commandes.length === 0 && <p>Vous n'avez pas de commandes en cours</p>}
          <h2> Mes produits en ventes </h2>
          {products.length === 0 && <p>Vous n'avez pas encore de produits en vente</p>}
          {/* componant list preview */}
        </div>
      </div>
    </div>
  )
}
