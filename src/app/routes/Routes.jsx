import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as URL from '../shared/constants/urls/urlConstants';
import { customHistory } from '../shared/services/historyServices';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import ModifyAccountView from '../views/ModifyAccountView';
import RegisterView from '../views/RegisterView';
import UserView from '../views/UserView';


/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
    return (
        <Switch history={customHistory}>
            <Route exact path={URL.URL_HOME} component={HomeView} />
            <Route exact path={URL.URL_LOGIN} component={LoginView} />
            <Route exact path={URL.URL_REGISTER} component={RegisterView} />
            <Route exact path={URL.URL_USER} component={UserView} />
            <Route
                exact
                path={URL.URL_MODIFYACCOUNT + ':typeModification'}
                component={ModifyAccountView}
            />
        </Switch>
    );
};

export default Routes;
