import React from 'react';
import { Link } from 'react-router-dom';
import { URL_ADMIN_DEMANDESCOM, URL_ADMIN_LISTUSERS, URL_ADMIN } from '../../../shared/constants/urls/urlConstants';

export default function Navigation() {
  return (
    <nav className="flex flex-col justify-between bg-black text-white h-900">
        <Link to={URL_ADMIN} className="py-2 hover:bg-magentacorner w-full text-left p-5">
        Tableau de bord
        </Link>
        <Link to={URL_ADMIN_LISTUSERS} className="py-2 hover:bg-magentacorner w-full text-left p-5">
        Listes des utilisateurs
        </Link>
        <Link to={URL_ADMIN_DEMANDESCOM} className="py-2 hover:bg-magentacorner w-full text-left p-5">
        Demandes de commerciaux
        </Link>
    </nav>
  )
}
