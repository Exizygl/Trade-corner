import React from 'react';
import './CardUser.css';
import { useSelector, useDispatch } from 'react-redux';

export default function CardUser(props) {

let role = "";
if (props.role === 0)
{ role = "utilisateur normal"};

  return (
    <div className=" cardPerso shadow-2xl border-solid border-2 ">
      <div className="illus">
        {props.imageProfilUrl ?
          <img src={`http://localhost:8080/static/` + props.imageProfilUrl} className='m-auto' alt="preview" width={200} height={200} />
          :
          <p> Aucune image </p>
        }
      </div>
      <div>
        <p> Nom de l'utilisateur : {props.name} </p>
        <p> Role de l'utilisateur: {role}</p>
      </div>
    </div>
  )
}
