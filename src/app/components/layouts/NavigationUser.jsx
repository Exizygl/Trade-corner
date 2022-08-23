import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationUser() {
  return (
    <nav className="flex flex-col justify-between bg-black text-white h-900">
        <Link to='' className="py-2 hover:bg-magentacorner w-full text-left p-5">
        Informations
        </Link>
        <Link to='' className="py-2 hover:bg-magentacorner w-full text-left p-5">
        Commandes
        </Link>
    </nav>
  )
}
