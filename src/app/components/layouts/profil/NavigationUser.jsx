import React from 'react';
import { Link } from 'react-router-dom';
import { URL_BECOMESELLER } from '../../../shared/constants/urls/urlConstants';
import { useSelector, useDispatch } from 'react-redux';

export default function NavigationUser() {

  const user = useSelector((state) => state.auth.user);



  return (
    <nav className="flex flex-col justify-between ">

{user.imageProfilUrl ? <img src={`https://trade-corner-back.onrender.com/static/` + user.imageProfilUrl} 
                        onError={(e) => (e.currentTarget.src = `https://trade-corner-back.onrender.com/default.jpg`)} 
                        className='m-auto rounded-full object-cover w-[200px] h-[200px] shadow-lg shadow-black' alt="Photo de profil" /> :
                        <p> Aucune image </p>}

        <div id="Liens" className="flex flex-col justify-between bg-black text-white h-900 mt-10">

        <Link to='' className="py-2 hover:bg-magentacorner w-full text-left p-5">
        Informations
        </Link>
        <Link to='' className="py-2 hover:bg-magentacorner w-full text-left p-5">
        Commandes
        </Link>
        <Link to={ URL_BECOMESELLER }className="py-2 hover:bg-magentacorner w-full text-left p-5">
        Devenir vendeur
        </Link>
        </div>
    </nav>
  )
}
