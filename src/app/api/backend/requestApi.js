import apiBackEnd from './api.Backend';

export const register = (values) => {
   return apiBackEnd.post('user/register', values);
};

export function confirmRegistration(values) {
    return apiBackEnd.put('user/confirm', values);
}

export const authenticate = (values) => {
   return apiBackEnd.post('user/login', values);
};

export const getAllUser = () => {
    return apiBackEnd.get('user');
};


export const userInfo = (id) => {
    return apiBackEnd.get('user/' + id);
};

export const userInfoUpdate = (values) => {
    return apiBackEnd.post('user/update', values);
};

export function uploadUserImage(values) {
    return apiBackEnd.post('user/upload-image', values);
}