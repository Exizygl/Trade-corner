import React from 'react';
import { useFormik } from 'formik';

const Register = () => {
    const initialValues = {
        pseudo: '',
        name: '',
        email: '',
        phoneNumber: '',
        adress: '',
        zipcode: '',
        ville: '',
        password: '',
        passwordConfirmation: '',
        gcu: false,
    };
    const formik = useFormik({
        initialValues,
    });

    const {
        pseudo,
        name,
        email,
        phoneNumber,
        adress,
        zipcode,
        ville,
        password,
        passwordConfirmation,
        cgu,
    } = formik.values;

    return (
        <div>
            <div className="global">
                <form>
                    <div>
                        <label htmlFor="pseudo">Pseudonyme : </label>
                        <input
                            type="text"
                            name="pseudo"
                            id="pseudo"
                            value={pseudo}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="name">Nom complet: </label>
                        <input
                            type="text"
                            name="name"
                            id="surName"
                            value={name}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div></div>

                    <div>
                        <label htmlFor="email">Email : </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={formik.handleChange}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
