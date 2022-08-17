import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import CardUser from './CardUser';
import { useSelector } from 'react-redux';


export default function Administration() {

  const users = useSelector(state => state.adm.users); //je pointe sur le tableau user dans le store
  
  return (
    <div className="flex flex-row mx-12 gap-10 bg-darkgray text-white">
        <div className = "basis-3/12">
            <Navigation/>
        </div> 
        <div className= "basis-9/12 "> 
          <h2>Panneau d'administration</h2>
          <h3>Liste des utilisateurs</h3>
          <div className="flex flex-wrap">
            {users.map( user => 
            <Link to={`/administration/user/${user.id}`} key={user.id} >
              <CardUser key = {user.id} name = {user.name} role = {user.role}  imageProfilUrl = {user.imageProfilUrl}/>
            </Link>
            )}
          </div>
        </div>
    </div>
  )
}
