import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userInfo } from '../../api/backend/requestApi';


import { URL_DELETE, URL_MODIFYACCOUNT } from '../../shared/constants/urls/urlConstants';
import { updateUser } from '../../shared/redux-store/authenticationSlice';




const User = () => {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch()


    useEffect(() => {
        userInfo(user._id).then(
            function (res) {
                if (res.status === 200) {

                    dispatch(updateUser(res.data));


                }
            });
    }, []);

    return (
        <div className="flex mt-12">
            <nav className="flex flex-col w-1/5 ml-12 bg-white">
                <div href="" className="py-2 hover:bg-gray-100 w-full text-center">
                    Information
                </div>
                <div href="" className="py-2 hover:bg-gray-100 w-full text-center">
                    Commandes
                </div>
            </nav>
            <div className="flex flex-col w-2/5 ml-12 bg-white">
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Pseudonyme</div>
                        <div>{user.pseudo}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'pseudo'}>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Avatar</div>
                        {user.imageProfilUrl ? <div><img src={`http://localhost:8080/static/` + user.imageProfilUrl} className='m-auto' alt="preview" width={200} height={200} /></div> :
                            <p> Aucune image </p>}
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'avatar'}>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Adresse</div>
                        <div>{user.adress} {user.zipcode} {user.ville}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'adress'}>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
