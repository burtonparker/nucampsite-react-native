import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites, // what's the current state of each of these
            comments,
            partners,
            promotions,
            favorites // anytime we add a new reducer, we have to add it to the store, so we import it, and add it here. done.
        }),
        applyMiddleware(thunk, logger) // logger you can probably leave out of your public version of the site, for debugging only really.
    );

    return store;
}