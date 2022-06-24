import apiBackEnd from './api.Backend';

export const register = (values) => {
    apiBackEnd.post('user/register', values);
};

export const login = (values) => {
    apiBackEnd.post('user/login', values);
};
