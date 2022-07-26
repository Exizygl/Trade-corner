import * as Yup from 'yup';

// Regex

const regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const regExNumberPhone =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,3})[ \\-]*)*?[0-9]{2,3}?[ \\-]*[0-9]{2,3}?$/;
const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default Yup.object().shape({
    pseudo: Yup.string()
        .required('Le pseudo est requis !')
        .min(3, 'Le pseudonyme doit avoir au moins 3 caractères !'),

    name: Yup.string().required('Votre nom et prénom est requis !'),

    email: Yup.string()
        .email('Veuillez saisir une adresse mail valide !')
        .required('Une adresse mail est requis !')
        .matches(regExEmail, 'Veuillez entrer une adresse mail valide !'),

    adress: Yup.string().required('Une adresse postal est requis !'),

    zipcode: Yup.string()
        .required('Un code postal est requis')
        .min(4, 'le code postal doit comporter au minimum 4 caractères')
        .max(7, 'Le code postal doit comporter au maximum 7 caractères'),

    ville: Yup.string().required('Une ville est requis'),

    password: Yup.string()
        .required('Le champ mot de passe est requis !')
        .min(8, 'Le mot de passe doit avoir au moins 8 caractères !')
        .matches(
            regExPassword,
            'Veuillez créer un mot de passe plus fort ! 1 Majuscule, 1 Minuscule, 1 chiffre, 1 Caractère',
        ),

    passwordConfirmation: Yup.string()
        .required('Le champ de confirmation du mot de passe est requis !')
        .oneOf([Yup.ref('password'), null], 'Les mots de passes ne correspondent pas !'),

    phoneNumber: Yup.string()
        .required('Un numéro de téléphone est requis !')
        .matches(regExNumberPhone, 'Le numéro de téléphone est invalide !'),
});
