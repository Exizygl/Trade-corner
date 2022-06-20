
import apiBackEnd from './api.Backend';

export const register = (values) => {
    apiBackEnd.post("auth/register", values)
}
