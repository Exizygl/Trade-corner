import axios from 'axios';
import { getToken, removeToken } from '../../shared/services/tokenServices';
import handleHttpError from './../../shared/components/form-and-error-components/HandleHttpError';
import { URL_LOGIN } from '../../shared/constants/urls/urlConstants';
import { customHistory } from '../../shared/services/historyServices';

/**
 * Instance axios sécurisée pour le BACKEND
 * Ajoute automatiquement le JWT et gère l'expiration
 * 
 * @author Peter Mollet
 */
const apiBackEnd = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000, // Timeout de 10 secondes pour éviter les requêtes infinies
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiBackEnd;

/**
 * Intercepteur de requête
 * Ajoute automatiquement le token JWT dans le header Authorization
 * Protection contre les attaques CSRF en vérifiant la présence du token
 * 
 * @author Peter Mollet
 */
apiBackEnd.interceptors.request.use(
    (request) => {
        const token = getToken();
        
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Intercepteur de réponse
 * Gère les erreurs HTTP et l'expiration du token (401)
 * Redirige automatiquement vers login si token expiré
 * 
 * @author Peter Mollet
 */
apiBackEnd.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Si erreur 401 (non autorisé) = token expiré ou invalide
        if (error.response?.status === 401) {
            removeToken(); // Supprime le token invalide
            customHistory.push(URL_LOGIN); // Redirige vers login
        }
        
        // Si erreur 403 (interdit) = pas les droits
        if (error.response?.status === 403) {
            console.error('Accès refusé : droits insuffisants');
        }
        
        handleHttpError(error);
        return Promise.reject(error);
    }
);
