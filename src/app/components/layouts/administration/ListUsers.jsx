import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import CardUser from './CardUser';
import { useSelector } from 'react-redux';


export default function Administration() {

  const users = useSelector(state => state.adm.users); //je pointe sur le tableau user dans le store
  
  return (
    <div className="mx-12">
    <h1>Panneau d'administration</h1>
    <div className="flex flex-row flex-wrap lg:flex-nowrap gap-10 bg-darkgray text-white">

        <div className = "basis-11/12 lg:basis-3/12">
            <Navigation/>
        </div> 

        <div className= "flex flex-col basis-11/12 lg:basis-9/12 justify-between "> 
          <h2>Liste des utilisateurs</h2>
          <div className="flex flex-wrap gap-10">
            {users.map( user => 
            <Link to={`/administration/user/${user.id}`} key={user.id} >
              <CardUser key = {user.id} name = {user.name} role = {user.role}  imageProfilUrl = {user.imageProfilUrl}/>
            </Link>
            )}
          </div>
        </div>
    </div>
    </div>
  )
}
