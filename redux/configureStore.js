import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // updates the state to local storage anytime we rehydrate

const config = { // first two properties are required here
    key: 'root',
    storage, // this is local storage but could be many different types of storage. also note: storage, is shorthand for storage: storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, { // pass config as the first argument now that we're using persistCombineReducers instead
            campsites, // what's the current state of each of these
            comments,
            partners,
            promotions,
            favorites // anytime we add a new reducer, we have to add it to the store, so we import it, and add it here. done.
        }),
        applyMiddleware(thunk, logger) // logger you can probably leave out of your public version of the site, for debugging only really.
    );

    const persistor = persistStore(store); // this enables the store to be persisted.

    return { persistor, store }; // now export an object so we can access BOTH from App.js
}