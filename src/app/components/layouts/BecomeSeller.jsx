import React, { useState } from 'react';
import { useFormik } from 'formik';
import Navigation from '../layouts/administration/Navigation';
import { Link, useHistory } from 'react-router-dom';
import { URL_BECOMESELLER } from '../../shared/constants/urls/urlConstants';
import { validationBecomeSeller } from '../../utils/Validation';


const BecomeSeller = () => {

    const history = useHistory();

    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");


    const initialValues = {
        file: null,
        message: ''
    };

    function becomeSeller(values) {

    }

    const formik = useFormik({
        initialValues,
        validationSchema : validationBecomeSeller,
        onSubmit: (values) => {


            becomeSeller(values).then((res) => {
                if (res.data.errors) {
                    setMsgError(res.data.errors)
                }
                if (res.status === 200 && !res.data.errors) {
                    history.push(URL_BECOMESELLER);


                }
            });
            setErrorLog(true)
        },
    });

    const { file , message } = formik.values;

    return (
        <div>
            <div className="bg-black text-white text-center w-2/3 m-auto p-6 px-[120px]">
                <form className="" onSubmit={formik.handleSubmit}>
                    <legend className="mb-6"><h2>Devenir vendeur</h2></legend>

                    <label htmlFor="file">Importer votre pièce d'identité</label>
                    <div>
                        <input
                            type="file"
                            className="input mb-6"
                            name="file"
                            value={file}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                    <label htmlFor="email">Insérez votre message ici...</label>
                    <div>
                        <input
                            type="message"
                            className="input mb-6"
                            name="message"
                            value={message}
                            onChange={formik.handleChange}
                        />
                    </div>


                    <button className="btn-primary" type="submit">Envoyer</button>


                    {(errorLog && msgError.file) && <ErrorMessSmall middle message="La pièce d'identité est obligatoire" />}
                    {(errorLog && msgError.file) && <ErrorMessSmall middle message="Format du fichier incompatible" />}
                    {(errorLog && msgError.file) && <ErrorMessSmall middle message="Fichier trop volumineux" />}
                </form>
            </div>
        </div>
    );
};

export default BecomeSeller;
