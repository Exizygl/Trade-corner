import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { URL_LOGIN } from '../shared/constants/urls/urlConstants';


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={URL_LOGIN} />
                )
            }
        />
    );
};

export default ProtectedRoute;
