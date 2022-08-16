import React from 'react';
import {useEffect,useState} from 'react';
import Navigation from './Navigation';
import PreviewListUsers from './PreviewListUsers';
import { useSelector, useDispatch } from 'react-redux';
import {setListUsers, setListRoles} from '../../../shared/redux-store/administrationSlice';
import { getAllUser, getAllRoles } from '../../../api/backend/requestApi';


export default function Administration() {

const users = useSelector(state => state.adm.users); //je pointe sur le tableau user dans le store
const dispatch = useDispatch();

//récupération des roles de la BDD, enregistrement dans le store
const getlistRoles =  () => {
  getAllRoles() //j'appelle l'api 
  .then (
    function (res) {
      if (res.status === 200) {
        let resRoles = res.data.message.roles ;
        let roles = [];
        for (let i=0; i<resRoles.length; i++) { 
          let label = resRoles[i].label;
          let id = i;
          let role = { 
            label : label ,
            id : id
          }
          roles.push(role);      //j'ai récup la liste des rôles
        };
        dispatch(setListRoles(roles));  //enregistrement des rôles dans le store           
      }
    }
  )
};
//récuération des utilisateurs de la BDD, enregistrement dans le store
const getlistUsers = () => {
  getAllUser() //j'appelle l'api 
  .then (
    function (res) {
      if (res.status === 200) {
        let usersTemp = [];
        for (let i=0; i<res.data.length; i++) { 
          let name= res.data[i].name;
          let id = res.data[i]._id;
          let role = res.data[i].role.label;
          let imageProfilUrl = res.data[i].imageProfilUrl;
          let user = {name : name, id: id, role : role, imageProfilUrl :  imageProfilUrl};
          usersTemp.push(user);      //j'ai récup les données que je voulais
        };    
        dispatch(setListUsers(usersTemp));//je transfere le tableau au store
      }
    }
  )
}

useEffect( () => {
  getlistUsers();
  getlistRoles();
}
  ,[]
)


  return (
    <div className="flex flex-row mx-12 gap-10 bg-darkgray text-white">
        <div className = "basis-3/12">
            <Navigation/>
        </div> 
        <div className= "basis-9/12 "> 
            <h2>Panneau d'administration</h2>
            <h3>Liste des utilisateurs</h3>
            { <PreviewListUsers/> }
            {/* barre de recherche */}
            <p>Nombre total d'utilisateurs : {users.length} </p>

            <h3>Liste des demandes</h3>
            {/* preview Liste demandes */}
            <p>Vous n'avez pas de demandes en attente.</p>
        </div> 
    </div>
  )
}