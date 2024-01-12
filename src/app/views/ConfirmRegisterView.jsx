import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    URL_LOGIN,
    URL_REGISTER
} from './../shared/constants/urls/urlConstants';
import { confirmRegistration } from '../api/backend/requestApi';

const ConfirmRegisterView = () => {
    const [emailCrypt, setEmailCrypt] = useState("");

    useEffect(() => {

        if (window.location.href.length >= 95) {
            setEmailCrypt(window.location.href.substr(-64))
        } else {
            setEmailCrypt(false)
        }
    }, []);

    const confirm = () => {

        confirmRegistration({ emailCrypt: emailCrypt })
            .then((res) => {
                if (res.status === 200 && res.data.message) {
                  
                }
            })
            .catch((e) => console.log("error confirm =>", e));
    }

    return (
        <div className="flex items-center justify-center h-40 w-1/2 mx-auto bg-black">
            {emailCrypt && <button
                className="btn-primary"
                onClick={() => confirm()}>
                <Link to={URL_LOGIN}>
                    Activez votre compte
                </Link>
            </button>}
            {!emailCrypt && <button
                className="btn-primary btn-primary">
                <Link to={URL_REGISTER}>
                    Inscrivez-vous
                </Link>
            </button>}
        </div>
    );
};

export default ConfirmRegisterView;