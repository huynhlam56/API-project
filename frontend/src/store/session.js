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

// LOG OUT USER

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeSession());
    return response
}

// SIGNUP A USER
export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(loadSession(data.user));
    return response;
  };

  // RESTORE USER
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(loadSession(data.user))
    return response
}

//LOG IN USER
export const logInUser = (user) => async dispatch => {
    console.log('LOOK HERE')
    const { credential, password } = user
    console.log(user, 'USER')
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })
    if(response.ok) {
        const data = await response.json();
        dispatch(loadSession(data.user))
        return response
    }
}

const intialState = {user: null}

const sessionReducer = (state = intialState, action) => {
    switch (action.type) {
        case LOAD_SESSION:
            return { ...state, user: {...action.user} };
        case REMOVE_SESSION:
            return {...state, user: null};
        default:
          return state;
      }
}

export default sessionReducer;
