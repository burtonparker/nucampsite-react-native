import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments') // we need thunk because of this specific use of fetch, because this is not a pure function, which redux hates, so we use a thunk and the double fat arrow trick above.
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;  // throws to catch, funny
            })
        .then(response => response.json()) // translates from json to javascript
        .then(comments => dispatch(addComments(comments))) // this can be called whatever but we call it comments since it represents the comments array
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({ // this could also be called whatever
    type: ActionTypes.ADD_COMMENTS, // sending objects to our reducers
    payload: comments
});

export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

export const fetchPromotions = () => dispatch => {
    
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

export const fetchPartners = () => dispatch => {
    
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

// let's add some action creators for our favorites functionality

export const postFavorite = campsiteId => dispatch => { // here we're passing the campsiteId of the favorite we want to POST to the server. then we wrap the function body in a second arrow and pass the dispatch function, as redux thunk allows us to do.
    setTimeout(() => {
        dispatch(addFavorite(campsiteId)); // not gonna actually POST to a server yet, just simulate it with a timeout, then we will dispatch the campsiteId to the addFavorite action creator.
    }, 2000);

};

export const addFavorite = campsiteId => ({ // non-thunked, simply returning an action object
    type: ActionTypes.ADD_FAVORITE,
    payload: campsiteId
})

export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const d = new Date();
    
    const newComment = { // this is a single comment object we are passing into an array
        campsiteId,
        rating,
        author,
        text,
        date: d.toISOString()
    };
    setTimeout(() => {
        dispatch(addComment(newComment)); 
    }, 2000);
}

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})