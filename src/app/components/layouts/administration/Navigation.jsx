import React from 'react';
import { Link } from 'react-router-dom';
import { URL_ADMIN_DEMANDESCOM, URL_ADMIN_LISTUSERS, URL_ADMIN } from '../../../shared/constants/urls/urlConstants';

export default function Navigation() {
  return (
    <nav className="flex flex-col  bg-white">
        <Link to={URL_ADMIN} className="py-2 hover:bg-gray-100 w-full text-center">
        Tableau de bord
        </Link>
        <Link to={URL_ADMIN_LISTUSERS} className="py-2 hover:bg-gray-100 w-full text-center">
        Listes des utilisateurs
        </Link>
        <Link to={URL_ADMIN_DEMANDESCOM} className="py-2 hover:bg-gray-100 w-full text-center">
        Demandes de commerciaux
        </Link>
    </nav>
  )
}
