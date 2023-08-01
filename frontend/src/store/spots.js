import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'
const SPOT_DETAIL = 'spots/spotDetail'

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

export const getSpotDetail = spot => ({
  type: SPOT_DETAIL,
  spot
})

// GET SINGLE SPOT
export const getSpotDetailThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json()
    dispatch(getSpotDetail(spot))
  }
}


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
      const spotState = {};
      action.spots.Spots.forEach((spot) => {
        spotState[spot.id] = spot
      })
      return {singleSpot: spotState}
    case CREATE_SPOT:
      return {...state, [action.spot.id]: action.spot }
      default:
        return state;
  }
}

export default spotsReducer
