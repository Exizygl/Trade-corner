import { yupToFormErrors } from 'formik';
import * as Yup from 'yup';

// Regex

const regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const regExNumberPhone = /^(0|(\+[0-9]{2}[. -]?))[1-9]([. -]?[0-9][0-9]){4}$/;
const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regExVille = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const regExZipCode = /^[0-9]{5}(?:-[0-9]{4})?$/;

// Validation par YUP

const validationAddProduct = Yup.object().shape(
    {
    title : Yup.string()
        .required ('Il manque un titre à votre produit')
        .min(4).max(30),

    description : Yup.string()
        .required('Il manque une description à votre produit')
        .min(20).max(800),

    category : Yup.string()
        .required('Veuillez selectionner une catégorie'),

    tags: Yup.string(),

    price : Yup.number()
        .required('Veuillez indiquer un prix pour votre produit')
        .min(1).max(1000),


    quantity: Yup.number()
        .required('veuillez indiquer le nombre de produit en stock')
        .min(1).max(40),
        
    photos : Yup.mixed()
    // .test(nom du test, message d'erreur, fonction à tester)

        .test('minimum', 'Une photo du produit est obligatoire', function (value) { 
            if (!value) return false;
            if (value.length < 1) return false;
            return true;
        })
        .test('maximum', 'Vous ne pouvez importer que 5 photos maximum', function (value) {
            if (!value) return false;
            if (value.length > 5) return false;
            return true;
        })
        .test('PhotoTypes','Les photos doivent etre en jpg, jpeg ou png', function (value) {
            if (!value) return false;
            const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
            const validFormats = [];
            for(let i=0; i<value.length; i++){
                validFormats.push(SUPPORTED_FORMATS.includes(value[i].type));//push true si le format est compris dans les SUPPORTED_FORMAT
            }
            return validFormats.every((value) => value === true);//renvoie true si toutes les valeurs de validFormats sont à true
        })
        .test('PhotoSize', 'les photos doivent faire 1Mo maximum chacune', function(value){
            const validSize = [];
            for(let i=0;i<value.length; i++){
                if (value[i].size <= 1000000)//1mo
                validSize.push(true);
                else validSize.push(false);    
            }
            return validSize.every((value) => value === true);
        }),
    }
);

const validationRegister = Yup.object().shape({
    pseudo: Yup.string()
        .required('Un pseudonyme est requis !')
        .min(3, 'Le pseudonyme doit avoir au moins 3 caractères !'),

    name: Yup.string().required('Votre nom et prénom sont requis !'),

    email: Yup.string()
        .email('Veuillez saisir une adresse mail valide !')
        .required('Une adresse mail est requise !')
        .matches(regExEmail, 'Veuillez entrer une adresse mail valide !'),

    adress: Yup.string().required('Une adresse postal est requise !'),

    zipcode: Yup.string()
        .required('Un code postal est requis !')
        .min(4, 'le code postal doit comporter au minimum 4 caractères')
        .max(7, 'Le code postal doit comporter au maximum 7 caractères')
        .matches(regExZipCode, 'Veuillez saisir un code postal correct !'),

    ville: Yup.string()
        .required('Une ville est requise !')
        .matches(regExVille, 'Veuillez entrer une ville valide'),

    password: Yup.string()
        .required('Le champ mot de passe est requis !')
        .min(8, 'Le mot de passe doit avoir au moins 8 caractères !')
        .matches(
            regExPassword,
            'Veuillez créer un mot de passe plus fort ! 1 Majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial',
        ),

    passwordConfirmation: Yup.string()
        .required('Le champ de confirmation du mot de passe est requis !')
        .oneOf([Yup.ref('password'), null], 'Les mots de passes ne correspondent pas !'),

    phoneNumber: Yup.string()
        .required('Un numéro de téléphone est requis !')
        .matches(regExNumberPhone, 'Le numéro de téléphone est invalide !')
        .min(9, 'Le numéro de téléphone doit comporter au minimum 9 numéros')
        .max(11, 'Le numéro de téléphone doit comporter au maximum 11 numéros'),
});

const validationModifyProduct = Yup.object().shape(
    {
    title : Yup.string()
        .required ('Il manque un titre à votre produit')
        .min (4).max(30),

    description : Yup.string()
        .required('Il manque une description à votre produit')
        .min(20).max(800),

    category : Yup.string()
        .required('Veuillez selectionner une catégorie'),

    tags: Yup.string(),

    price : Yup.number()
        .required('Veuillez indiquer un prix pour votre produit')
        .min(1).max(1000),


    quantity: Yup.number()
        .required('veuillez indiquer le nombre de produit en stock')
        .min(1).max(40),
        
    photos : Yup.mixed()
        .test('PhotoTypes','Les photos doivent etre en jpg, jpeg ou png', function (value) {
            if (!value) return true;
            const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
            const validFormats = [];
            for(let i=0; i<value.length; i++){
                validFormats.push(SUPPORTED_FORMATS.includes(value[i].type));//push true si le format est compris dans les SUPPORTED_FORMAT
            }
            return validFormats.every((value) => value === true);//renvoie true si toutes les valeurs de validFormats sont à true
        })
        .test('PhotoSize', 'les photos doivent faire 1Mo maximum chacune', function(value){
            const validSize = [];
            for(let i=0;i<value.length; i++){
                if (value[i].size <= 1000000)//1mo
                validSize.push(true);
                else validSize.push(false);    
            }
            return validSize.every((value) => value === true);
        }),
    
    photosNumber : Yup.number()
        .min(1, "Une photo de produit est obligatoire").max(5, "Vous ne pouvez importer que 5 photos maximum"),
    }
);

const validationBecomeSeller = Yup.object().shape(
    {
        idFile : Yup.mixed()
            .required("Une copie de votre pièce d'identité est requise")
            .test('FileTypes','Le document doit être en jpg, jpeg, png ou pdf', function (value) {
                    if (!value) return false;
                    const SUPPORTED_FORMATS = ['file/jpg', 'file/jpeg', 'file/png', 'file/pdf'];
                    const validFormats = [];
                    for(let i=0; i<value.length; i++){
                        validFormats.push(SUPPORTED_FORMATS.includes(value[i].type));
                    }

                    return validFormats.every((value) => value === true);
                }
            )
            .test('PhotoSize', 'les photos doivent faire 1Mo maximum chacune', function(value){
                const validSize = [];
                for(let i=0;i<value.length; i++){
                    if (value[i].size <= 1000000)//1mo
                        validSize.push(true);
                    else validSize.push(false);
                }
                return validSize.every((value) => value === true);
            })
        ,
    }
);

export {validationAddProduct, validationRegister, validationModifyProduct, validationBecomeSeller}

