import React from 'react';
import './CardUser.css';

export default function CardUser(props) {

  return (
    <div className=" cardPerso shadow-2xl border-solid border-2 ">
      <div className="illus">
        {props.imageProfilUrl ?
          <img src={`http://localhost:8080/static/` + props.imageProfilUrl} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className='m-auto' alt="preview" width={200} height={200} />
          :
          <img src={`http://localhost:8080/static/default.jpg`} className='m-auto' alt="preview" width={200} height={200} />
        }
      </div>
      <div>
        <p> Nom de l'utilisateur : <br/> {props.name} </p>
        <p> Role de l'utilisateur: <br/>{props.role}</p>
      </div>
    </div>
  )
}
