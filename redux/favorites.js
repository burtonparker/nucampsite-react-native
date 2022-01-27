import * as ActionTypes from './ActionTypes';

// setting up our reducer
export const favorites = (state = [], /* initialize the state of favorites to an empty array if it doesn't exist yet */ action /* also pass in the action */) => {
    switch (action.type) { // check for the action type here
        case ActionTypes.ADD_FAVORITE: // store the ids of each favorited campsite in the state as an array
            if (state.includes(action.payload)) { // if the user tries to add a new favorite it's going to receive the id of the campsite as the payload. includes will help us check if the campsite's id already exists in the array. this returns a boolean true/false for us.
                return state; // return the previous state if the favorite id is already in the array
            }
            return state.concat(action.payload); // id not already present? now then we will return a new state with the campsite id concatenated to the end of it. this adds a new item to the array without mutating the previous array.

        default:
            return state; // default just returns the previous state.
        }
};