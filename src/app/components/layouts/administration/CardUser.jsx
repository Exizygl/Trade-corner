import React from 'react';

export default function CardUser(props) {

  return (
    <div className="bg-black h-[250px] lg:h-[392px] w-[200px] lg:w-[300px] mb-5">
      <div className="">
        {props.imageProfilUrl ?
          <img src={`http://trade-corner-back.onrender.com/static/` + props.imageProfilUrl} className="object-cover h-[150px] lg:h-[300px] w-full" onError={(e) => (e.currentTarget.src = `https://trade-corner-back.onrender.com/static/default.jpg`)}  alt="photo de profil"  />
          :
          <img src={`http://trade-corner-back.onrender.com/static/default.jpg`} className='m-auto object-cover h-[150px] lg:h-[300px] w-full' alt="avatar par defaut" height={200} />
        }
      </div>
      <div id="description" className="p-5">
        <p> {props.name} </p>
        <p> {props.role}</p>
      </div>
    </div>
  )
}
