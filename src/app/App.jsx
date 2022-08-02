import React from 'react';
import RoutesWithNavigation from './routes/RoutesWithNavigation';

import { store } from './shared/redux-store/store';
import { Provider } from 'react-redux';
//persistence du store
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

/**
 * Component APP
 * with:
 * 	- creation of redux store
 * @author Peter Mollet
 */
const App = () => {
    return (
        <Provider store={store}>
            {/* <PersistGate persistor={persistor}> */}
            <RoutesWithNavigation />
            {/* </PersistGate> */}
        </Provider>
    );
};

export default App;
