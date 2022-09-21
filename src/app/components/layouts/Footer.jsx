import React from 'react';
import logo from './../../assets/images/logo-trade-corner-footer-white_2.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
    return (
        <footer className="bg-black mt-[60px]">
            <div className="text-white h-400 w-auto flex flex-wrap flex-col md:flex-row justify-around leading-10">
                <div className="m-10 md:h-[300px] max-w-[200px] w-1/4 flex items-center">
                    <img src={logo} alt="logo" className="min-h-[150px] min-w-[150px]"></img>
                </div>
                <div className="m-10 text-[20px] leading-[60px]">
                    <h4 className="font-bold">A PROPOS</h4>
                    <ul>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                Conditions générales de ventes
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                Conditions générales d&#x27;utilisation
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                Mentions légales
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                Politique de confidentialités
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="m-10 text-[20px] leading-[60px]">
                    <h4 className="font-bold">INFORMATIONS</h4>
                    <ul>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                Qui sommes nous ?
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                Notre enseigne
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                Plan du site
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                Cookies
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="m-10 text-[20px] leading-[60px]">
                    <h4 className="font-bold">DES QUESTIONS ?</h4>
                    <ul>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal"
                            >
                                Contactez-Nous
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline font-normal "
                            >
                                Besoin d&#x27;aide ?
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="line-white"></div>

            <div className="text-white overline flex justify-center">
                <a href="#" className="cursor-pointer m-10 ">
                    <TwitterIcon className="" />
                </a>

                <a href="#" className="cursor-pointer mt-10">
                    <InstagramIcon />
                </a>
                <a href="#" className="cursor-pointer m-10 ">
                    <FacebookIcon />
                </a>
                <a href="#" className="cursor-pointer mt-10 ">
                    <YouTubeIcon />
                </a>
            </div>
            <div>
                <span className="text-white mr-20 flex justify-center pb-10  w-full">
                    <CopyrightIcon className="" />
                    2022 - Tous droits réservés TRADE CORNER
                </span>
            </div>
        </footer>
    );
}

export default Footer;
