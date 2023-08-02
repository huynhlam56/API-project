import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'
const SPOT_DETAIL = 'spots/spotDetail'
const REMOVE_SPOT = 'spots/removeSpot'
const EDIT_SPOT = 'spots/editSpot'


export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  }
}

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

export const editSpotAction = (spot) => ({
  type: EDIT_SPOT,
  spot
})

//EDIT SPOT
export const editSpotThunk = (spot) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'Application/json'},
    body: JSON.stringify(spot)
  })
  if(response.ok) {
    const editedSpot = await response.json()
    dispatch(editSpotAction(editedSpot))
    return editedSpot
  } else {
    const errors = await response.json()
    return errors
  }
}

// REMOVE SPOT
export const removeSpotThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  })

  if(response.ok) {
    dispatch(removeSpotAction(spotId))
  }
}

// GET SINGLE SPOT
export const getSpotDetailThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json()
    console.log(spot, response)
    dispatch(receiveSpot(spot))
  }
}


// CREATE A NEW SPOT
export const createSpot = (spots) => async dispatch => {
  console.log('YES')
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(spots)
  })
  if(response.ok) {
    const spot = await response.json()
    dispatch(createSpotAction(spot))
  } else {
    // ADD ERROR HERE LATER
    console.log('SPOT WAS NOT CREATED')
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

// function normalized(arr) {
//   const normalizedObj = {}
//   arr.forEach(obj => normalizedObj[obj.id] = obj)
//   return normalizedObj
// }

const intialState = {
  allSpots: {}, // normalized kvps
  singleSpot: {}
}

const spotsReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {};
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot
      })
      return {allSpots: spotsState}
    case SPOT_DETAIL:
      const singleSpot = action.spot;
      return {...state, singleSpot}
    case CREATE_SPOT:
      return {...state, [action.spot.id]: action.spot }
    case EDIT_SPOT:
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
