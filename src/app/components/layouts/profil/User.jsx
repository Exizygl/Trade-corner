import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userInfo } from '../../../api/backend/requestApi';

import { URL_DELETE, URL_MODIFYACCOUNT } from '../../../shared/constants/urls/urlConstants';
import { updateUser } from '../../../shared/redux-store/authenticationSlice';
import NavigationUser from './NavigationUser';


const User = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        userInfo(user._id).then(
            function (res) {
                if (res.status === 200) {
                   
                    const updatedUser = {...res.data, 
                        roleId : res.data.role._id, 
                        roleLabel : res.data.role.label, 
                        adressId : res.data.adress._id,
                        adressCity: res.data.adress.city,
                        adressStreet : res.data.adress.street,
                        adressZipcode :res.data.adress.zipcode};
                        
                    // dispatch(updateUser(res.data));
                    dispatch(updateUser(updatedUser));

                }
            });
    }, []);


    return (
        <div className=" mx-12">
        <h1>Mon Profil</h1>
        <div className="flex flex-row flex-wrap lg:flex-nowrap  gap-10 bg-darkgray text-white">

            <div className='basis-11/12 lg:basis-3/12'>
                <NavigationUser/>
            </div>  

            <div className="basis-11/12 lg:basis-9/12">
                <h2>Mes coordonées</h2>

                <div id="pseudonyme" className="flex flex-col md:flex-row pb-2 pt-5 justify-between border-b-2 border-magentacorner">
                    <p className="">Pseudonyme : <span className="pl-5">{user.pseudo}</span></p>
                    <Link to={URL_MODIFYACCOUNT + 'pseudo'}>
                        <button className="btn-primary px-10 mt-5 md:mt-0">
                            Modifier
                        </button>
                    </Link>
                </div>

                <div id="nom" className="flex flex-col md:flex-row pb-2 pt-8 justify-between border-b-2 border-magentacorner">
                    <p className="">Nom : <span className="pl-5">{user.name}</span></p>
                    <Link to={URL_MODIFYACCOUNT + 'name'}>
                        <button className="btn-primary px-10 mt-5 md:mt-0">
                             Modifier
                        </button>
                    </Link>   
                </div>

                <div id="email" className="flex flex-col md:flex-row pb-2 pt-8 justify-between border-b-2 border-magentacorner">
                    <p className="">Email : <span className="pl-5">{user.email}</span></p>
                    <Link to={URL_MODIFYACCOUNT + 'email'}>
                        <button className="btn-primary px-10 mt-5 md:mt-0">
                            Modifier
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row pb-2 pt-8 justify-between border-b-2 border-magentacorner">
                    <p className="">Téléphone : <span className="pl-5">{user.phoneNumber}</span></p>
                        <Link to={URL_MODIFYACCOUNT + 'phone'}>
                            <button className="btn-primary px-10 mt-5 md:mt-0">
                                Modifier
                            </button>
                        </Link>
                </div>

                <div id="adresse" className="flex flex-col md:flex-row pb-2 pt-8 justify-between border-b-2 border-magentacorner">
                    <p className="">Adresse : <span className="pl-5">{user.adressStreet} {user.adressZipcode} {user.adressCity}</span></p>
                    <Link to={URL_MODIFYACCOUNT + 'adress'}>
                        <button className="btn-primary px-10 mt-5 md:mt-0">
                            Modifier
                        </button>
                    </Link>
                </div>

                <div id="avatar" className="flex flex-col md:flex-row pb-2 pt-8 justify-between border-b-2 border-magentacorner">
                    <div className="">Avatar : </div>
                    {user.imageProfilUrl ? <div><img src={`http://localhost:8080/static/` + user.imageProfilUrl} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className='m-auto' alt="preview" width={200} height={200}/></div> :
                    <p> Aucune image </p>}
                    <Link to={URL_MODIFYACCOUNT + 'avatar'}>
                        <button className="btn-primary px-10 mt-5 md:mt-0">
                            Modifier
                        </button>
                    </Link>
                </div>

                <div id="password" className="flex flex-col md:flex-row pb-2 pt-8 justify-between border-b-2 border-magentacorner">
                    <p className="">Mot de passe : <span className="pl-5">**********</span></p>
                    <Link to={URL_MODIFYACCOUNT + 'password'}>
                        <button className="btn-primary px-10 mt-5 md:mt-0">
                            Modifier
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row pb-2 pt-8 justify-between">
                    <p className="">Supprimer le compte</p>
                    <Link to={URL_DELETE}>
                        <button className="btn-red px-10 mt-5 md:mt-0">
                            Supprimer
                        </button>
                    </Link>
                </div>

            </div>

        </div>
        </div>
    );
};

export default User;
