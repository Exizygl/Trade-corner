import React from 'react';
import { Link } from 'react-router-dom';
import {URL_SELLER, URL_SELLER_ADDPRODUCT, URL_SELLER_LISTPRODUCTS, 
  URL_SELLER_COMMANDES, URL_SELLER_RETOURS, URL_SELLER_HISTORY} from '../../../shared/constants/urls/urlConstants';

export default function Navigation() {
  return (
    <nav className="flex flex-col justify-between bg-black text-white h-900">
        <div className="flex flex-col">
            <Link to={URL_SELLER} className="py-2 hover:bg-magentacorner w-full text-left p-5">
            Ma boutique
            </Link>
            <Link to={URL_SELLER_LISTPRODUCTS} className="py-2 hover:bg-magentacorner w-full text-left p-5">
            Mes produits
            </Link>
            <Link to={URL_SELLER_ADDPRODUCT} className="py-2 hover:bg-magentacorner w-full text-left p-5">
            Ajouter un produit
            </Link>
            <Link to={URL_SELLER_COMMANDES} className="py-2 hover:bg-magentacorner w-full text-left p-5">
            Commandes et livraisons
            </Link>
            <Link to={URL_SELLER_RETOURS} className="py-2 hover:bg-magentacorner w-full text-left p-5">
            Gérer les retours
            </Link>
            <Link to={URL_SELLER_HISTORY} className="py-2 hover:bg-magentacorner w-full text-left p-5">
            Historique des ventes
            </Link>
        </div>

        <div className="flex flex-col">
            <Link to='' className="py-2 hover:bg-magentacorner w-full text-left p-5">
            Fermer ma boutique
            </Link>
            <Link to='' className="py-2 hover:bg-magentacorner w-full text-left p-5">
            Supprimer mon compte
            </Link>
        </div>

    </nav>
  )
}
