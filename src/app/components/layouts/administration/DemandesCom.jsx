import React from 'react';
import Navigation from './Navigation';

export default function Administration() {
  return (
    <div className="flex flex-row ml-12">
        <div className = "border-solid border-2 basis-2/6">
            <Navigation/>
        </div> 
        <div className= "border-solid border-2 basis-4/6 "> 
            <h2>Panneau d'administration</h2>
            <h3>Demandes des commerciaux</h3> 
            </div>
    </div>

  )
}
