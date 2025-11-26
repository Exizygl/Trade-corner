import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { URL_LOGIN, URL_HOME } from '../shared/constants/urls/urlConstants';
import jwt_decode from 'jwt-decode';

/**
 * Route protégée par rôle (admin, seller, etc.)
 * Vérifie l'authentification ET le rôle requis
 */
const RoleProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Redirect to={URL_LOGIN} />;
    }

    try {
        const decoded = jwt_decode(token);
        const userRole = decoded.role; // Adapte selon la structure de ton JWT
        
        return (
            <Route
                {...rest}
                render={(props) =>
                    userRole === requiredRole ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={URL_HOME} />
                    )
                }
            />
        );
    } catch (error) {
        // Token invalide
        localStorage.removeItem('token');
        return <Redirect to={URL_LOGIN} />;
    }
};

export default RoleProtectedRoute;
