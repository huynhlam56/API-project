import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'
const SPOT_DETAIL = 'spots/spotDetail'
const REMOVE_SPOT = 'spots/removeSpot'
const UPDATE_SPOT = 'spots/updateSpot'
const LOAD_USER_SPOTS = 'spots/loadUseSpots'



export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
})

export const createSpotAction = (spot) => ({
  type: CREATE_SPOT,
  spot
})

export const receiveSpot = spot => ({
  type: SPOT_DETAIL,
  spot
})

export const removeSpotAction = (spotId) => ({
  type: REMOVE_SPOT,
  spotId
})

export const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  spot
})

export const loadUsersSpotsAction = (spots) => ({
  type: LOAD_USER_SPOTS,
  spots
})

// GET USER SPOT
export const loadUserSpotsThunk = () => async dispatch => {
  const response = await csrfFetch(`/api/spots/current`)
  if(response.ok) {
    const spots = await response.json()
    dispatch(loadUsersSpotsAction(spots))
  }
}
//EDIT SPOT
export const updateSpot = (spot) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'Application/json'},
    body: JSON.stringify(spot)
  })
  if(response.ok) {
    console.log(response, 'RESPONSE FROM API')
    const updateSpot = await response.json()
    dispatch(updateSpotAction(updateSpot))
    return updateSpot
  } else {
    const errors = await response.json()
    console.log(errors, 'ERRORS FROM THUNK')
    return errors
  }
}

// REMOVE SPOT
export const removeSpotThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  })

  if(response.ok) {
    dispatch(fetchAllSpots())
  }
}

// GET SINGLE SPOT
export const getSpotDetailThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json()

    dispatch(receiveSpot(spot))
  }
}


// CREATE A NEW SPOT
export const createSpot = (spot) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(spot)
  })
  if(response.ok) {
    const data = await response.json()
    dispatch(createSpotAction(data))
    return data
  }
}

// GET ALL SPOTS
export const fetchAllSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots')

  if(response.ok) {
    const spots = await response.json()
    dispatch(loadSpots(spots))
  }
}


const intialState = {
  allSpots: {}, // normalized kvps
  singleSpot: {},
  userSpots: []
}

const spotsReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {};
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot
      })
      return {allSpots: spotsState}
    case LOAD_USER_SPOTS:
      return { ...state, userSpots: action.spots}
    case SPOT_DETAIL:
      const singleSpot = action.spot;
      return {...state, singleSpot}
    case CREATE_SPOT:
      return {...state, [action.spot.id]: action.spot }
    case UPDATE_SPOT:
      return {...state, [action.spot.id]: action.spot}
    case REMOVE_SPOT:
      const newState = {...state}
      delete newState[action.spotId]
      return newState
    default:
      return state;
  }
}

export default spotsReducer
