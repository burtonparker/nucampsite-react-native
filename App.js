import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore(); // creating the redux store by calling ConfigureStore into the 'store' variable.

export default function App() {
  return (
    <Provider store={store} /* wrap Main inside the Provider component and pass it the data store as a prop, this gives Main, plus all of it's children, the ability to connect to the redux store, by using 'connect'. */ > 
      <Main /* import the Main component */ />
    </Provider>
  );
}