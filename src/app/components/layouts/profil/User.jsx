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
                    dispatch(updateUser(res.data));
                }
            });
    }, []);


    return (
        <div className="flex gap-10 mx-12 bg-darkgray text-white">
            <div className='basis-3/12'>
                <NavigationUser/>
            </div>  

            <div className="flex flex-col basis-9/12">
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Pseudonyme</div>
                        <div>{user.pseudo}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'pseudo'}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Email</div>
                        <div>{user.email}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'email'}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Avatar</div>
                        {user.imageProfilUrl ? <div><img src={`http://localhost:8080/static/` + user.imageProfilUrl} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className='m-auto' alt="preview" width={200} height={200}/></div> :
                            <p> Aucune image </p>}
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'avatar'}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Nom</div>
                        <div>{user.name}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'name'}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Adresse</div>
                        <div>{user.adress.street} {user.adress.zipcode} {user.adress.city}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'adress'}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Téléphone</div>
                        <div>{user.phoneNumber}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'phone'}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Mot de passe</div>
                        <div>**********</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'password'}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Supprimer le compte</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_DELETE}>
                            <button className="btn-red">
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
