import { csrfFetch } from "./csrf";

const LOAD_SESSION = 'session/loadSession';
const REMOVE_SESSION = 'session/removeSession';

export const loadSession = (user) => {
    return {
      type: LOAD_SESSION,
      user
    };
};


export const removeSession = () => {
    return {
        type: REMOVE_SESSION
    }
};

export const restoreUser = () => async dispatch=> {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(loadSession(data.user))
    return response
}
export const logInUser = (user) => async dispatch => {
    const { credential, password } = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })

    if(response.ok) {
        const user = await response.json();
        dispatch(loadSession(user))
    }
}

const intialState = {user: null, isLoading: true}

const sessionReducer = (state = intialState, action) => {
    switch (action.type) {
        case LOAD_SESSION:
            return { ...state, user: {...action.user} };
        case REMOVE_SESSION:
            return {...state, user: null}
        default:
          return state;
      }
}

export default sessionReducer;
