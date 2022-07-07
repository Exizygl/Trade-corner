import { Disclosure, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../../api/backend/requestApi';
import { URL_HOME } from './../../shared/constants/urls/urlConstants';
import { URL_LOGIN } from './../../shared/constants/urls/urlConstants';
import { URL_REGISTER } from './../../shared/constants/urls/urlConstants';
import { URL_ADMIN } from './../../shared/constants/urls/urlConstants';
import { URL_USER } from './../../shared/constants/urls/urlConstants';
import { URL_LOGOUT } from './../../shared/constants/urls/urlConstants';

const Navbar = () => {
    const handleLogout = async () => {
        try {
            await axios.get({ Logout });
            localStorage.removeItem('firstLogin');
            window.location.href = '/';
        } catch (err) {
            window.location.href = '/';
        }
    };

    return (
        <Disclosure as="nav" className="top-0 fixed z-50 w-full bg-white shadow-md">
            {({ open }) => (
                <>
                    <div>
                        <div className="flex justify-between row items-center py-6 md:justify-start md:space-x-10">
                            <div className="Nav">
                                <div className="NavBar">
                                    <Link to={URL_HOME}>
                                        <img
                                            className="h-8 w-auto sm:h-10 cursor-pointer"
                                            src="https://insy2s.com/insy2s/images/Logo-insy2s-INLINE-2021.svg"
                                            alt=""
                                            width={200}
                                            height={60}
                                        />
                                    </Link>
                                </div>

                                <div className="">
                                    <Link to={URL_LOGIN} className="ml-3">
                                        Se connecter
                                    </Link>
                                    <Link to={URL_REGISTER} className="ml-3">
                                        S'enregistrer
                                    </Link>
                                    <button
                                        className="ml-8 btn btn-green"
                                        onClick={() => dispatch(signOut())}
                                    >
                                        {' '}
                                        Se déconnecter{' '}
                                    </button>
                                    <Link to={URL_USER} className="ml-3">
                                        Profil
                                    </Link>
                                    <Link to={URL_ADMIN} className="ml-3">
                                        Administration
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
                    </div>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
