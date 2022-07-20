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

export const Logout = () => {
    return apiBackEnd.get('user/');
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


export const userDelete = (values) => {
    return apiBackEnd.post('user/delete', values);
};

export const userDeleteInfo = (values) => {
    return apiBackEnd.post('deleteUser/create', values);
};

// requete d'admin uniquement
export const getAllUser = () => {
    return apiBackEnd.get('user');
};

export const deleteUserById = (values) =>{
    return apiBackEnd.put('admin/delete', values);
};

export const updateUserById = (values) => {
    return apiBackEnd.put('admin/update', values);
};
