import { CONNEXION } from './types';

export const connexion = (
    id,
    role,
    avatar,
    pseudo,
    name,
    email,
    phoneNumber,
    adress,
    zipcode,
    ville,
) => {
    return {
        type: CONNEXION,
        payload: {
            id,
            role,
            avatar,
            pseudo,
            name,
            email,
            phoneNumber,
            adress,
            zipcode,
            ville,
        },
    };
};
