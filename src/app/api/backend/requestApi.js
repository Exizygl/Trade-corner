import apiBackEnd from './api.Backend';

//REQUETES UTILISATEURS

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

export const forgottenPassword = (values) => {
    return apiBackEnd.post('user/forgotten-password', values);
};

export const passwordChange = (values) => {
    return apiBackEnd.post('user/password-change', values);
};

// export const userDeleteInfo = (values) => {
//     return apiBackEnd.post('deleteUser/create', values);
// };

// REQUETE D'ADMIN

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



//REQUETE PRODUIT

export const addProduct = (values) => {
    return apiBackEnd.post('product/add', values);
};

export const modifyProduct = (values) => {
    return apiBackEnd.put('product/modify', values);
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
    return apiBackEnd.get('product/search/' + search["search"] + "/" + search["page"] + "/" + search["superCategory"] + "/" + search["category"] + "/" + search["order"] + "/" + search["minimun"] + "/" + search["maximun"]);
};

//REQUETE CATEGORIES


export const getProductsFrom = (id) => {
    return apiBackEnd.get('product/user/' + id);
};

//requete categorie


export const getAllCategory = () => {
    return apiBackEnd.get('category');
};

export const getAllSuperCategory = () => {
    return apiBackEnd.get('super-category');
};

export const getbySuperCategory = (label) => {
    return apiBackEnd.get('super-category/' + label);

}


//REQUETE DEMANDES


