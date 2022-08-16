import React from 'react';

export default function CardUser(props) {

  return (
    <div className="bg-black h-[300px] w-[200px] mr-5 mb-5">
      <div className="">
        {props.imageProfilUrl ?
          <img src={`http://localhost:8080/static/` + props.imageProfilUrl} className="object-cover h-[130px] w-[200px]" onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)}  alt="preview"  />
          :
          <img src={`http://localhost:8080/static/default.jpg`} className='m-auto object-cover h-[130px] w-[200px]' alt="preview" height={200} />
        }
      </div>
      <div>
        <p className="p-5"> Nom de l'utilisateur : <br/> {props.name} </p>
        <p className="px-5"> Role de l'utilisateur: <br/>{props.role}</p>
      </div>
    </div>
  )
}
