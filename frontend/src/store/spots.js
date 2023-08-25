import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'
const SPOT_DETAIL = 'spots/spotDetail'
const REMOVE_SPOT = 'spots/removeSpot'
const UPDATE_SPOT = 'spots/updateSpot'
const LOAD_USER_SPOTS = 'spots/loadUserSpots'
const CREATE_SPOT_IMAGES = 'spots/createSpotImages'



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

export const createSpotImagesAction = (spotImgData) => ({
  type: CREATE_SPOT_IMAGES,
  spotImgData
})

// ADD IMAGES WHEN CREATING A SPOT
export const createSpotImageThunk = (spotId, url, preview) => async dispatch => {
  console.log('IN THE THUNK: RUNNING')
  if(url === '') {
    return null
  }
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {'Content-Type': 'Application/json'},
    body: JSON.stringify({url, preview})
  })
  if(response.ok) {
    const spotImgData = await response.json()
    dispatch(createSpotImagesAction(spotImgData))
  }
}

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
    const updateSpot = await response.json()
    dispatch(updateSpotAction(updateSpot))
    return updateSpot
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
  userSpots: {}
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
      console.log(action.spots)
      const spots = {}
      action.spots.Spots.forEach((spot) => {
         spots[spot.id] = spot
      })
      return { ...state, userSpots: spots}
    case SPOT_DETAIL:
      const singleSpot = action.spot;
      return {...state, singleSpot}
    case CREATE_SPOT:
      return {...state, singleSpot: {...action.spot, SpotImages: []}, [action.spot.id]: action.spot }
    case UPDATE_SPOT:
      return {...state, [action.spot.id]: action.spot}
    case REMOVE_SPOT:
      const newState = {...state}
      delete newState[action.spotId]
      return newState
    case CREATE_SPOT_IMAGES:
      return {...state, singleSpot: {...state.singleSpot, SpotImages: [...state.singleSpot.SpotImages, action.spotImgData]}}
    default:
      return state;
  }
}

export default spotsReducer
