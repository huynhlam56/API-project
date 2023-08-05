import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/loadReviews'
const CREATE_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const loadReviewsAction = (spotId, reviews) => ({
  type: LOAD_REVIEWS,
  payload: {spotId, reviews}
})

const createReviewAction = (review, user) => ({
  type: CREATE_REVIEW,
  payload: {review, user}
})

const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})

// GET ALL REVIEWS
export const loadAllReviewsThunk = (spotId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
      const reviews = await response.json()
      dispatch(loadReviewsAction(spotId, reviews))
      return reviews
    }
  } catch(error) {
    return
  }
}

// CREATE NEW REVIEW
export const createReviewThunk = (spotId, user, review, stars) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({review, stars})
  })

  if(response.ok) {
    const review = await response.json()
    dispatch(createReviewAction(review, user))
    return review
  }
}

// DELETE REVIEW
export const deleteReviewThunk = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if(response.ok) {
    dispatch(deleteReviewAction(reviewId))
  }
}


// REDUCER
const initialState = {
  spot: {},
  user: {}
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviewsState = {}
      action.payload.reviews.Reviews.forEach((review) => {
        reviewsState[review.id] = review
      })
      return {spot: reviewsState}
    case CREATE_REVIEW:
        return {...state, spot:{...state.spot, [action.payload.review.id]: {...action.payload.review, User: action.payload.user}}}
    case DELETE_REVIEW:
      const newState = {...state}
      delete newState.spot[action.reviewId]
      return newState
    default:
      return state
  }
}

export default reviewsReducer;
