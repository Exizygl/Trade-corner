import React from 'react';
import Navigation from './Navigation';
import CardUser from './CardUser';

export default function Administration() {
  return (
    <div className="flex flex-row ml-12">
        <div className = "border-solid border-2 basis-2/6">
            <Navigation/>
        </div> 
        <div className= "border-solid border-2 basis-4/6 "> 
            <h2>Panneau d'administration</h2>
            <h3>Liste des utilisateurs</h3>
            {/* barre de recherche */}
            <p>Nombre total d'utilisateurs : </p>
            {/* Liste utilisateurs */}
            <h3>Liste des utilisateurs</h3>
            {/* Liste utilisateurs */}
            <p>Vous n'avez pas de demandes en attente.</p>
            <CardUser/>
        </div> 

    </div>
  )
}
