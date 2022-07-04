import React from 'react';
import './CardUser.css';
import { useSelector, useDispatch } from 'react-redux';

export default function CardUser(props) {

//const data=1;
//const userName = useSelector(state => state.adm.users[{data}].name);
//const userRole = useSelector(state => state.adm.users[{data}].role);

let role = "";
if (props.role === 0)
{ role = "utilisateur normal"};


  return (
    <div className=" cardPerso shadow-2xl border-solid border-2 ">
        <div className="illus">
            <img src="https://media.anakinworld.com/uploads/entries/original/dup-personnage-leia-organa-solo.jpg" alt="" className=""/>
        </div>
     <div>
        <p> Nom de l'utilisateur : {props.name} </p>
        <p> Role de l'utilisateur: {role}</p>
        </div>
    </div>
  )
}
