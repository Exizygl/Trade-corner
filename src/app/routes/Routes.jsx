import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as URL from '../shared/constants/urls/urlConstants';
import { customHistory } from '../shared/services/historyServices';
import HomeView from '../views/HomeView';

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
        </Switch>
    );
};

export default Routes;
