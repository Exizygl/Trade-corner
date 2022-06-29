import { CONNEXION } from '../actions/types';



const initialState = {
    userInfo: {
        id: 0,
        role: 0,
        avatar: '',
        pseudo: '',
        name: '',
        email: '',
        phoneNumber: '',
        adress: '',
        zipcode: '',
        ville: ''
    },
};

export default function rootReducer(state = initialState, action) {


    switch (action.type) {
        case CONNEXION:
            return {
                userInfo: {
                    id: action.payload.id,
                    role: action.payload.role,
                    avatar: action.payload.avatar,
                    pseudo: action.payload.pseudo,
                    name: action.payload.name,
                    email: action.payload.email,
                    phoneNumber: action.payload.phoneNumber,
                    adress: action.payload.adress,
                    zipcode: action.payload.zipcode,
                    ville: action.payload.ville
                },
            };
        default:
            return state;
    }
}
