import { Disclosure, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { URL_HOME, URL_LOGIN, URL_REGISTER,URL_LOGOUT, URL_PANIER } from './../../shared/constants/urls/urlConstants';
import { URL_USER, URL_ADMIN, URL_SELLER } from './../../shared/constants/urls/urlConstants';
import logo from '../../assets/images/logo-trade-corner-white.jpg';


import { selectIsLogged, signOut } from './../../shared/redux-store/authenticationSlice';
import Search from './Search';
const Navbar = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.auth.isLogged);
    const role = useSelector((state)=> state.auth.user.roleLabel);

    
    return (
        <Disclosure as="nav" className="top-0 fixed w-full bg-black text-white z-10">
            {({ open }) => (
                <div>
                    <div className="flex justify-between row items-center py-6 mx-10 h-[100px]">

                        <div className="flex flex-row">
                            <Link to={URL_HOME}>
                                <img
                                className="cursor-pointer"
                                src={logo}                                         
                                alt="Trade Corner, vente, achat, occasion"
                                width={200}  
                                />
                            </Link>
                            <Search />
                        </div>

                        <div className="h-[50px] items-center">
 
                            {isLogged===true && <Link to={URL_USER} className="ml-5">
                                Profil
                            </Link>}

                            {role === "seller" && <Link to={URL_SELLER} className="ml-5">
                                Ma boutique
                            </Link>}
                            
                            {isLogged===true && <Link to={URL_PANIER} className="ml-5">
                                Panier
                            </Link>}

                            {role === "admin" && <Link to={URL_ADMIN} className="ml-5">
                                Administration
                            </Link>}
                            
                            {isLogged===false && <Link to={URL_REGISTER} className="btn-nav-primary ml-5">
                                S'enregistrer
                            </Link>}
                            
                            {isLogged ? <Link to={URL_LOGOUT}>
                                <button
                                    className="btn-nav-primary ml-5"
                                    onClick={() => dispatch(signOut())}
                                >
                                    Se déconnecter
                                </button>
                            </Link> : <Link to={URL_LOGIN} className=" btn-nav-primary ml-5">
                                Se connecter
                            </Link> }
                            
                        </div>
                  
                        <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                            <Disclosure.Button
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-white hover:bg-primary 
                                    focus:outline-none transform active:scale-95 active:ring-2 active:ring-offset-2 active:ring-primary "
                            >
                            {open ? (
                                <XIcon
                                    className="block h-6 w-6"
                                    aria-hidden="true"
                                />
                            ) : (
                                <MenuIcon
                                    className="block h-6 w-6"
                                    aria-hidden="true"
                                />
                            )}
                        </Disclosure.Button>
                       
                        </div>
                    </div>
                </div>                        
            )}
        </Disclosure>
    );
};

export default Navbar;
