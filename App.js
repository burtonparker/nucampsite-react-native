import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';

const { persistor, store } = ConfigureStore(); // creating the redux store by calling ConfigureStore into the 'store' variable. note: now we're destructuring persistor AND store.

export default function App() {
  return (
    <Provider store={store} /* wrap Main inside the Provider component and pass it the data store as a prop, this gives Main, plus all of it's children, the ability to connect to the redux store, by using 'connect'. */ > 
      <PersistGate // prevents app from loading until/unless the redux state has rehydrated fully from the client side storage.
        loading={<Loading />} // whatever we pass into the loading prop, is what will show while the store is rehydrating.
        persistor={persistor}>
        <Main /* import the Main component */ />
      </PersistGate>
    </Provider>
  );
}