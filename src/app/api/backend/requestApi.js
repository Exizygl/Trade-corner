import apiBackEnd from './api.Backend';

export const register = (values) => {
    apiBackEnd.post('user/register', values);
};

export const authenticate = (values) => {
   return apiBackEnd.post('user/login', values);
};

export const getAllUser = () => {
    return apiBackEnd.get('user');
};

export const userInfo = (id) => {
    return apiBackEnd.get('user/' + id);
};

export const userInfoUpdate = (id, values) => {
    return apiBackEnd.get('user/' + id, values);
};
