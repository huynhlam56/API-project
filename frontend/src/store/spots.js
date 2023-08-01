import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'

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

// CREATE A NEW SPOT
export const createSpot = (spots) => async dispatch => {
  const response = await csrfFetch('api/spots', {
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

const intialState = {
  allSpots: {}, // normalized kvps
}

const spotsReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {};
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot
      })
      return {allSpots: spotsState}
    case CREATE_SPOT:
      return {...state, [action.spot.id]: action.spot }
      default:
        return state;
  }
}

export default spotsReducer
