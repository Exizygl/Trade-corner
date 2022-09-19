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

export const getAllRoles = () => {
    return apiBackEnd.get('roleUsers');
};

export const deleteUserById = (values) => {
    return apiBackEnd.put('admin/delete', values);
};

export const updateUserById = (values) => {
    return apiBackEnd.put('admin/update', values);
};

export function uploadUserImageById(values) {
    return apiBackEnd.post('admin/upload-image', values);
}

export const forgottenPassword = (values) => {
    return apiBackEnd.post('user/forgotten-password', values);
};

export const passwordChange = (values) => {
    return apiBackEnd.post('user/password-change', values);
};

//requete produit

export const addProduct = (values) => {
    return apiBackEnd.post('product/add', values);
};

export const getAllProduct = () => {
    return apiBackEnd.get('product');
};

export const getNewProduct = () => {
    return apiBackEnd.get('product/new');
};

export const getProduct = (id) => {
    return apiBackEnd.get('product/' + id);
};
export const search = (search) => {
    return apiBackEnd.get('product/search/' + search["search"] + "/" + search["page"] + "/" + search["superCategory"] + "/" + search["category"]);
};
export const searchCount = (search) => {
    return apiBackEnd.get('product/searchCount/' + search["search"] + "/" + search["superCategory"] + "/" + search["category"]);
};

<<<<<<< HEAD
export const getProductsFrom = (id) => {
    return apiBackEnd.get('product/user/' + id);
};

//requete categorie
=======
//requete categorie & SuperCategory
>>>>>>> 0de64b78bf659082cd5b6b207b629577621b645e

export const getAllCategory = () => {
    return apiBackEnd.get('category');
}

export const getAllSuperCategory = () => {
    return apiBackEnd.get('super-category');
}

export const getbySuperCategory = (label) => {
    return apiBackEnd.get('super-category/' + label);
}


