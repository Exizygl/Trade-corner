import { Disclosure, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { Link } from 'react-router-dom';

import { URL_HOME } from './../../shared/constants/urls/urlConstants';
import { URL_LOGIN } from './../../shared/constants/urls/urlConstants';
import { URL_REGISTER } from './../../shared/constants/urls/urlConstants';

const Navbar = () => {
    return (
        <Disclosure as="nav" className="top-0 fixed z-50 w-full bg-white shadow-md">
            {({ open }) => (
                <>
                    <div>
                        <div className="flex justify-between row items-center py-6 md:justify-start md:space-x-10">
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
                            <div className="direction">
                                <Link to={URL_REGISTER}>S'enregistrer</Link>
                                <Link to={URL_LOGIN}>Se connecter</Link>
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
