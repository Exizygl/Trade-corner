import React from 'react';
import './CardUser.css';
import { useSelector, useDispatch } from 'react-redux';

export default function CardUser() {

//const data=1;
//const userName = useSelector(state => state.adm.users[{data}].name);
//const userRole = useSelector(state => state.adm.users[{data}].role);

  return (
    <div className=" cardPerso shadow-2xl border-solid border-2 ">
        <div className="truc">
            <img src="https://media.anakinworld.com/uploads/entries/original/dup-personnage-leia-organa-solo.jpg" alt="" className=""/>
        </div>
     <div>
        <p> Nom de l'utilisateur : </p>
        <p> Role de l'utilisateur:</p>
        </div>
    </div>
  )
}
