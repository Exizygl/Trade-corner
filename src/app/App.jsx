import React from 'react';
import RoutesWithNavigation from './routes/RoutesWithNavigation';

import { store } from './shared/redux-store/store';
import { Provider } from 'react-redux';

/**
 * Component APP
 * with:
 * 	- creation of redux store
 * @author Peter Mollet
 */
const App = () => {
    return (
        <Provider store={store}>
            <RoutesWithNavigation />
        </Provider>
    );
};

export default App;
