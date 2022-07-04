import React from 'react';
import {useEffect,useState} from 'react';
import Navigation from './Navigation';
import CardUser from './CardUser';
import { useSelector, useDispatch } from 'react-redux';
import {setListUsers} from '../../../shared/redux-store/administrationSlice';
import { getAllUser } from '../../../api/backend/requestApi';


export default function Administration() {

const [usersState, setUsersState] = useState(false);

const users = useSelector(state => state.adm.users); //je pointe sur le tableau user dans le store
const dispatch = useDispatch();



  return (
    <div className="flex flex-row ml-12">
        <div className = "border-solid border-2 basis-2/6">
            <Navigation/>
        </div> 
        <div className= "border-solid border-2 basis-4/6 "> 
            <h2>Panneau d'administration</h2>
            <h3>Liste des utilisateurs</h3>
            {/* barre de recherche */}
            <p>Nombre total d'utilisateurs : {users.length} </p>

            



            {/* Liste utilisateurs */}
            <h3>Liste des demandes</h3>
            {/* Liste demandes */}
            <p>Vous n'avez pas de demandes en attente.</p>
            {/* {users && users[0].name} */}
            
            {/* <button onClick={handleClick}>Button</button> */}
        </div> 
    </div>
  )
}

// { {state.adm.usersmap( user => 
//   <CardUser key = {user.id} name = {user.name} />
//  )} }