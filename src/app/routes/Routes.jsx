import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as URL from '../shared/constants/urls/urlConstants';
import { customHistory } from '../shared/services/historyServices';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import ConfirmRegisterView from '../views/ConfirmRegisterView';

//import utilisateur
import UserView from '../views/UserView';
import ModifyAccountView from '../views/ModifyAccountView';
import UserDeleteView from '../views/UserDeleteView';
import ForgottenPasswordView from '../views/forgottenPasswordView';
import PasswordChangeView from '../views/PasswordChangeView';


//import administration
import AdministrationView from '../views/administration/AdministrationView';
import ListUsersView from '../views/administration/ListUsersView';
import UserByIdView from '../views/administration/UserByIdView';
import ModifyAccountByAdminView from '../views/administration/ModifyAccountByAdminView';
import DemandesComView from '../views/administration/DemandesComView';
import DeleteUserByIdView from '../views/administration/DeleteUserByIdView';

//import vendeur
import MaBoutiqueView from '../views/maBoutique/maBoutiqueView';


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
            <Route path={URL.URL_CONFIRM_REGISTER} component={ConfirmRegisterView} />
            
            {/*routes pour le profil */}
            <Route exact path={URL.URL_USER} component={UserView} />
            <Route path={URL.URL_DELETE} component={UserDeleteView} />
            <Route path={URL.URL_FORGOTTENPASSWORD} component={ForgottenPasswordView} />
            <Route path={URL.URL_PASSWORDCHANGE} component={PasswordChangeView} />
            <Route
                exact
                path={URL.URL_MODIFYACCOUNT + ':typeModification'}
                component={ModifyAccountView}
            />
            {/* routes administrateur */}
            <Route exact path={URL.URL_ADMIN} component={AdministrationView} />
            <Route exact path={URL.URL_ADMIN_LISTUSERS} component={ListUsersView} />
            <Route exact path={URL.URL_USER_BYID + ':id'} component={UserByIdView} />
            <Route
                exact
                path={URL.URL_MODIFYACCOUNT_BYID + ':typeModification' + '/' + ':id'}
                component={ModifyAccountByAdminView}
            />
            <Route exact path={URL.URL_DELETE_USER_BYID + ':id'} component={DeleteUserByIdView} />
            <Route exact path={URL.URL_ADMIN_DEMANDESCOM} component={DemandesComView} />

            {/* routes vendeurs */}
            <Route exact path={URL.URL_SELLER} component={MaBoutiqueView} />

        </Switch>
    );
};

export default Routes;
