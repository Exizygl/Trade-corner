import * as Yup from 'yup';

// Regex

// const regExPassword = /^[a-zA-Z][0-9]{8,}$/;
const regExNumberPhone =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,3})[ \\-]*)*?[0-9]{2,3}?[ \\-]*[0-9]{2,3}?$/;

export default Yup.object().shape({
    pseudo: Yup.string()
        .required('Le pseudo est requis !')
        .min(3, 'Le pseudonyme doit avoir au moins 3 caractères !'),
    email: Yup.string()
        .email('Veuillez saisir une adresse mail valide !')
        .required('Une adresse mail est requis !'),
    password: Yup.string()
        .required('Le champ mot de passe est requis !')
        .min(8, 'Le mot de passe doit avoir au moins 8 caractères !'),
    // .matches(regExPassword, 'Veuillez créer un mot de passe plus fort !'),
    passwordConfirmation: Yup.string()
        .required('Le champ de confirmation du mot de passe est requis !')
        .oneOf([Yup.ref('password'), null], 'Les mots de passes ne correspondent pas !'),
    phoneNumber: Yup.string()
        .required('Un numéro de téléphone est requis !')
        .matches(regExNumberPhone, 'Le numéro de téléphone est invalide !'),
});
