import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/loadReviews'
const CREATE_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const loadReviewsAction = (spotId) => {
  type: LOAD_REVIEWS,
  reviews,
  spotId
}

const createReviewAction = (review) => {
  type: CREATE_REVIEW,
  review
}

const deleteReviewAction = (reviewId) => {
  type: DELETE_REVIEW,
  reviewId
}

// GET ALL REVIEWS
export const loadAllReviewsThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if(response.ok) {
    const reviews = await response.json()
    dispatch(loadReviewsAction(reviews))
    return reviews
  }
}
// CREATE NEW REVIEW
export const createReviewThunk = (spotId, review) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(review)
  })

  if(response.ok) {
    const review = await response.json()
    dispatch(createReviewAction(review))
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
      const { spotId, reviews } = action.payload
      return { ...state, [spotId]: reviews}
    case CREATE_REVIEW:
      return {...state, [spotId]: [...(state[spotId] || []), review]}
  }
}
