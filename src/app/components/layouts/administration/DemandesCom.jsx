import React from 'react';
import Navigation from './Navigation';

export default function Administration() {
  return (
    <div className="">
      <h1>Panneau d'administration</h1>
      <div className="flex flex-row flex-wrap lg:flex-nowrap gap-10 bg-darkgray text-white">
        
        <div className = "basis-11/12 lg:basis-3/12">
            <Navigation/>
        </div> 

        <div className= "flex flex-col basis-11/12 lg:basis-9/12 justify-between  "> 
          <h2>Panneau d'administration</h2>
          <h3>Demandes des commerciaux</h3> 
        </div>
      </div>
    </div>
  )
}
