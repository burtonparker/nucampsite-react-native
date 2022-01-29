import * as ActionTypes from './ActionTypes'; // namespace import, import EVERYTHING ActionTypes.fillintheblank works now

// what's happening here, well first we import the action types, then, we export the campsites.js reducer.

export const campsites = (state /* <-- the campsites section of the state here, and we initialize it with the default function parameters syntax if it hasn't already been initiatialized. */ = { isLoading: true,
                                     errMess: null,
                                     campsites: []}, action) /* then it takes the action here, and depending on what it is... this is where this.props.campsites.campsites comes from, notice we're using campsites twice */ => {
    switch (action.type) { // it creates and returns a NEW state!
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, /* whatever is already in state currently */ isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state; // or if none of the actions match, we just return the previous state without doing anything to it.
      }
};