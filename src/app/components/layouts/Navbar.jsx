import { Disclosure, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { URL_HOME, URL_LOGIN, URL_REGISTER,URL_LOGOUT } from './../../shared/constants/urls/urlConstants';
import { URL_USER, URL_ADMIN, URL_SELLER } from './../../shared/constants/urls/urlConstants';
import logo from '../../assets/images/logo-trade-corner-white.jpg';


import { selectIsLogged, signOut } from './../../shared/redux-store/authenticationSlice';
import Search from './Search';
const Navbar = () => {
    const dispatch = useDispatch();
    return (
        <Disclosure as="nav" className="top-0 fixed w-full bg-black text-white">
            {({ open }) => (
               
                    <div>
                        <div className="flex justify-between row items-center py-6 mx-10 h-[100px]">

                                <div className="">
                                    <Link to={URL_HOME}>
                                        <img
                                            className="cursor-pointer"
                                            src={logo}                                         
                                            alt="Trade Corner, vente, achat, occasion"
                                            width={341}
                                            
                                        />
                                    </Link>
                                        <Search />
                                        <Link to={URL_LOGIN} className="ml-3">
                                            Se connecter
                                        </Link>
                                        <Link to={URL_REGISTER} className="ml-3">
                                            S'enregistrer
                                        </Link>
                                        <Link to={URL_LOGOUT}>
                                            <button
                                                className="ml-3"
                                                onClick={() => dispatch(signOut())}
                                            >
                                                {' '}
                                                Sign out{' '}
                                            </button>
                                        </Link>
                                        <Link to={URL_USER} className="ml-3">
                                            Profil
                                        </Link>
                                        <Link to={URL_SELLER} className="ml-3">
                                            Ma boutique
                                        </Link>
                                        {/* <Link to={URL_ADMIN} className="ml-3">
                                            Administration
                                        </Link> */}
                                    </div>
                                

                                <div className="h-[50px] items-center">
                                    
                                    
                                <Link to={URL_LOGOUT}>
                                        <button
                                            className="ml-3"
                                            onClick={() => dispatch(signOut())}
                                        >
                                            {' '}
                                            Sign out{' '}
                                        </button>
                                    </Link>
                                    <Link to={URL_USER} className="ml-5">
                                        Profil
                                    </Link>
                                    <Link to={URL_SELLER} className="ml-5">
                                        Ma boutique
                                    </Link>
                                    <Link to={URL_ADMIN} className="ml-5">
                                        Administration
                                    </Link>
                                    <Link to={URL_REGISTER} className="btn-nav-primary ml-5">
                                        S'enregistrer
                                    </Link>
                                    <Link to={URL_LOGIN} className=" btn-nav-primary ml-5">
                                        Se connecter
                                    </Link>
                                </div>
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
                       
                    
            )}
        </Disclosure>
    );
};

export default Navbar;
