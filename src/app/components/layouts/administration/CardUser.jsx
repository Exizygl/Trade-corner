import React from 'react';
import './CardUser.css';

export default function CardUser() {
  return (
    <div className=" cardPerso shadow-2xl border-solid border-2 ">
        <div className="truc">
            <img src="https://media.anakinworld.com/uploads/entries/original/dup-personnage-leia-organa-solo.jpg" alt="" className=""/>
        </div>
     <div>
        <p> Nom de l'utilisateur</p>
        <p> Role de l'utilisateur</p>
        </div>
    </div>
  )
}
