import React from 'react';
import Navigation from './Navigation';

export default function Administration() {
  return (
    <div className="flex flex-row mx-12 gap-10 bg-darkgray text-white">
        <div className = "basis-3/12">
            <Navigation/>
        </div> 
        <div className= "basis-9/12 "> 
            <h2>Panneau d'administration</h2>
            <h3>Demandes des commerciaux</h3> 
            </div>
    </div>

  )
}
