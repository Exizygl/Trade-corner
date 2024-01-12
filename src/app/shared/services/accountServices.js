import { getPayloadToken, getToken } from './tokenServices';

/**
 * To get all the roles of the current user
 *
 * @return {Array} roles of the current user
 * @author Peter Mollet
 */
export function accountRoles() {
    const payload = getPayloadToken();
    return payload.auth.split(',');
}

/**
 * To get the login of the current user
 *
 * @return {string} login of the current user
 * @author Peter Mollet
 */
export function accountLogin() {
    const payload = getPayloadToken();
    return payload.sub;
}

export function hasRole(role) {
    return accountRoles().includes(role);
}

/**
 * To check if the current user is authenticated
 * Check the token, and it's validity
 *
 * @return {boolean} true if user is authenticated
 * @author Peter Mollet
 */

export function isUserId() {
    const token = getToken();
    if (token) {
        const payload = getPayloadToken();
        return payload.id
    } else return false
}


export function isAuthenticated() {
    try {
        const token = getToken();
      
        const payload = getPayloadToken();

   
        const roles = payload.role;

        const expirationDate = payload.exp;

       
        const login = payload.pseudo;

        const dateNow = new Date();
        return token && (roles === "user" || roles === "seller" || roles === "admin") && login && expirationDate < dateNow.getTime();
    } catch {
        //  console.log('CATCH FALSE');
        return false;
    }
}
