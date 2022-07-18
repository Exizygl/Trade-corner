import React from 'react';
import {useEffect,useState} from 'react';
import Navigation from './Navigation';
import CardUser from './CardUser';
import { useSelector, useDispatch } from 'react-redux';
import {setListUsers} from '../../../shared/redux-store/administrationSlice';
import { getAllUser } from '../../../api/backend/requestApi';
import PreviewListUsers from './PreviewListUsers';


export default function Administration() {

const users = useSelector(state => state.adm.users); //je pointe sur le tableau user dans le store
const dispatch = useDispatch();

useEffect( () => {
  getAllUser() //j'appelle l'api 
  .then (
    function (res) {
      if (res.status === 200) {
        let usersTemp = [];
        for (let i=0; i<res.data.length; i++) { 
          let name= res.data[i].name;
          let id = res.data[i]._id;
          let role = res.data[i].role;
          let imageProfilUrl = res.data[i].imageProfilUrl;
          let user = {name : name, id: id, role : role, imageProfilUrl :  imageProfilUrl};
          usersTemp.push(user);      //j'ai récup les données que je voulais
        };    
        dispatch(setListUsers(usersTemp));//je transfere le tableau au store
      }
    }
  )
}
  ,[]
)


  return (
    <div className="flex flex-row ml-12">
        <div className = "border-solid border-2 basis-2/6">
            <Navigation/>
        </div> 
        <div className= "border-solid border-2 basis-4/6 "> 
            <h2>Panneau d'administration</h2>
            <h3>Liste des utilisateurs</h3>
            { <PreviewListUsers/> }
            {/* barre de recherche */}
            <p>Nombre total d'utilisateurs : {users.length} </p>


            {/* Liste utilisateurs */}
            <h3>Liste des demandes</h3>
            {/* Liste demandes */}
            <p>Vous n'avez pas de demandes en attente.</p>
        </div> 
    </div>
  )
}