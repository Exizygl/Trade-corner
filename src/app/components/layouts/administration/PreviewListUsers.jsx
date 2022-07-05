import React from 'react';
import CardUser from './CardUser';
import { useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { getAllUser } from '../../../api/backend/requestApi';
import { Link } from 'react-router-dom';
import { URL_ADMIN_DEMANDESCOM, URL_ADMIN_LISTUSERS, URL_ADMIN } from '../../../shared/constants/urls/urlConstants';

export default function PreviewListUsers() {

    const [state, setState] = useState({usersPreview : []})
    
    useEffect( () => {
        getAllUser() //j'appelle l'api 
        .then (
          function (res) {
            if (res.status === 200) {
              let usersTemp = [];
              for (let i=0; i<4; i++) { //pour la preview on récupére les 4 premiers utilisateurs
                let name= res.data[i].name;
                let id = res.data[i]._id;
                let role = res.data[i].role;
                let user = {name : name, id: id, role : role};
                usersTemp.push(user);
              };    
              setState (state => ({
                      usersPreview : [...state.usersPreview, ...usersTemp]
                    }));
            }
          }
        )
      }
        ,[]
      );

      console.log("userPreview" + JSON.stringify(state.usersPreview));

  return (
    <div>
        <div className="flex  flex-row ml-12 flex-wrap">
            {state.usersPreview.map( user => 
            <CardUser key = {user.id} name = {user.name} role = {user.role} />
            )}
        </div>
        <p>
            <Link to={URL_ADMIN_LISTUSERS} className="underline">
            voir plus
            </Link>
        </p>
    </div>
  )
}
