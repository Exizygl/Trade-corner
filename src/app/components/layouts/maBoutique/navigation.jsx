import React from 'react';
import { Link } from 'react-router-dom';
import {URL_SELLER} from '../../../shared/constants/urls/urlConstants';

export default function Navigation() {
  return (
    <nav className="flex flex-col justify-between bg-white h-900">
        <div className="flex flex-col">
            <Link to={URL_SELLER} className="py-2 hover:bg-gray-100 w-full text-center">
            Ma Boutique
            </Link>
            <Link to='' className="py-2 hover:bg-gray-100 w-full text-center">
            Mes Produits
            </Link>
            <Link to='' className="py-2 hover:bg-gray-100 w-full text-center">
            Ajouter un produit
            </Link>
            <Link to='' className="py-2 hover:bg-gray-100 w-full text-center">
            Commandes et livraisons
            </Link>
            <Link to='' className="py-2 hover:bg-gray-100 w-full text-center">
            Gérer les retours
            </Link>
            <Link to='' className="py-2 hover:bg-gray-100 w-full text-center">
            Historique des ventes
            </Link>
        </div>

        <div className="flex flex-col">
            <Link to='' className="py-2 hover:bg-gray-100 w-full text-center">
            Fermer ma boutique
            </Link>
            <Link to='' className="py-2 hover:bg-gray-100 w-full text-center">
            Supprimer mon compte
            </Link>
        </div>

    </nav>
  )
}
