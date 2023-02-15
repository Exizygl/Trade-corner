import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as URL from '../shared/constants/urls/urlConstants';
import { customHistory } from '../shared/services/historyServices';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import ConfirmRegisterView from '../views/ConfirmRegisterView';

//import utilisateur
import UserView from '../views/profil/UserView';
import ModifyAccountView from '../views/profil/ModifyAccountView';
import UserDeleteView from '../views/profil/UserDeleteView';
import BecomeSeller from '../views/profil/BecomeSellerView';

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
import ListProductsView from '../views/maBoutique/ListProductsView';
import AddProductView from '../views/maBoutique/AddProductView';
import CommandesView from '../views/maBoutique/CommandesView';
import RetoursView from '../views/maBoutique/RetoursView';
import HistoryView from '../views/maBoutique/HistoryView';
import ShopUsersView from '../views/products/ShopUsersView';


//import produit
import ProductDetailView from '../views/products/ProductDetailView';
import ProductListView from '../views/products/ProductListView';
import ModifyProductView from '../views/products/ModifyProductView';
import PanierView from '../views/PanierView';
import CommandView from '../views/CommandView';






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
            <Route exact path={URL.URL_PANIER} component={PanierView} />
            <Route exact path={URL.URL_COMMAND} component={CommandView} />
            <Route exact path={URL.URL_LOGIN} component={LoginView} />
            <Route exact path={URL.URL_REGISTER} component={RegisterView} />
            <Route path={URL.URL_CONFIRM_REGISTER} component={ConfirmRegisterView} />

            {/*routes pour les produits */}

            <Route exact path={URL.URL_PRODUCT + ':id'} component={ProductDetailView} />
            <Route
                exact
                path={URL.URL_PRODUCT + ':id'}
                component={ProductDetailView}
            />
            <Route
                exact
                path={URL.URL_MODIFYPRODUCT + ':id'}
                component={ModifyProductView}
            />
            <Route
                exact
                path={URL.URL_PRODUCTLIST + ':query?'}
                component={ProductListView}
            />


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
            <Route path={URL.URL_BECOMESELLER} component={BecomeSeller} />
            {/* routes administrateur */}
            <Route exact path={URL.URL_ADMIN} component={AdministrationView} />
            <Route exact path={URL.URL_ADMIN_LISTUSERS} component={ListUsersView} />
            <Route exact path={URL.URL_USER_BYID + ':id'} component={UserByIdView} />
            <Route
                exact
                path={URL.URL_MODIFYACCOUNT_BYID + ':typeModification' + '/' + ':id'}
                component={ModifyAccountByAdminView}
            />
            <Route
                exact
                path={URL.URL_DELETE_USER_BYID + ':id'}
                component={DeleteUserByIdView}
            />
            <Route exact path={URL.URL_ADMIN_DEMANDESCOM} component={DemandesComView} />

            {/* routes vendeurs */}
            <Route exact path={URL.URL_SELLER} component={MaBoutiqueView} />
            <Route
                exact
                path={URL.URL_SELLER_LISTPRODUCTS}
                component={ListProductsView}
            />
            <Route exact path={URL.URL_SELLER_ADDPRODUCT} component={AddProductView} />
            <Route exact path={URL.URL_SELLER_COMMANDES} component={CommandesView} />
            <Route exact path={URL.URL_SELLER_RETOURS} component={RetoursView} />
            <Route exact path={URL.URL_SELLER_HISTORY} component={HistoryView} />

            <Route exact path={URL.URL_SHOP + ':id'} component={ShopUsersView} />
        </Switch>
    );
};

export default Routes;
