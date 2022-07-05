import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import CardUser from './CardUser';
import { useSelector } from 'react-redux';
//import { URL_USER_BYID } from '../../../shared/constants/urls/urlConstants';


export default function Administration() {

  const users = useSelector(state => state.adm.users); //je pointe sur le tableau user dans le store
  
  return (
    <div className="flex flex-row ml-12">
        <div className = "border-solid border-2 basis-2/6">
            <Navigation/>
        </div> 
        <div className= "border-solid border-2 basis-4/6 "> 
          <h2>Panneau d'administration</h2>
          <h3>Liste des utilisateurs</h3>
          <div className="flex flex-wrap">
            {users.map( user => 
            <Link to={`/administration/user/${user.id}`} key={user.id} ><CardUser key = {user.id} name = {user.name} role = {user.role}  avatar = {user.avatar}/></Link>
            )}
          </div>
        </div>
    </div>
  )
}
