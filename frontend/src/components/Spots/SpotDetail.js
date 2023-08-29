import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getSpotDetailThunk } from "../../store/spots";
import SpotForm from "../CreateSpot/SpotForm";
import ConfirmationModal from "../RemoveSpot/ConfirmationModal";
import { loadAllReviewsThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import CreateReviewFormModal from "../Reviews/CreateReviewFormModal";
import RemoveReview from "../Reviews/RemoveReview";



export const SpotDetail = () => {
  const dispatch = useDispatch()
  const spot = useSelector(state => state.spots.singleSpot)
  const allReviews = useSelector(state => state.reviews.spot)
  const { spotId } = useParams()
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()

  useEffect(() => {
    dispatch(getSpotDetailThunk(spotId))
    dispatch(loadAllReviewsThunk(spotId)).catch(async(res) => {return})
  }, [dispatch])

  const handleClickReserveButton = () => {
    alert('Feature coming soon!')
  }

  const compareReviewDates = (reviewA, reviewB) => {
    const dateA = new Date(reviewA.createdAt);
    const dateB = new Date(reviewB.createdAt);
    return dateB - dateA;
  };

  const addReviews = () => {
    if(Object.keys(sessionUser).length !== 0 && sessionUser.id !== spot?.ownerId && Object.values(allReviews).length === 0 ) {
      return (
        <div>
          <h2>Be the first to write a review!</h2>
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateReviewFormModal />}
          />
        </div>
      )
    }
    let userReview = false
    for(let i = 0; i < Object.values(allReviews).length; i++) {
      let review = Object.values(allReviews)[i]
      if(sessionUser?.id === review?.userId) {
        userReview = true
      }
    }
    return (
      <div>
        {Object.values(allReviews).sort(compareReviewDates).map((review) => (showReviews(review)))}
        {
          !userReview && sessionUser.id !== spot?.ownerId
          ?
          <OpenModalButton
            className='post-review-button'
            buttonText="Post Your Review"
            modalComponent={<CreateReviewFormModal />}
          />
          :
          null
        }
      </div>
    )
  }

  const showReviews = (review) => {
    const dateObj = new Date(review.createdAt)
    const newDate = dateObj.toDateString()

    return (
      <li key={review.id}>
        <div>
          <p>{review.review}</p>
          <p>{newDate}</p>
          <p>{`${review.User.firstName} ${review.User.lastName}`}</p>
        </div>
        {Object.keys(sessionUser).length !== 0 && sessionUser.id === review.userId
          ?
          <RemoveReview review={review}/>
          :
          null
        }
      </li>
    )
  }

  const reviewCount = () => {
    if (spot.numReviews === 1) {
      return <h2>★ {parseFloat(spot.avgStarRating)?.toFixed(1)} · {spot.numReviews} Review</h2>
    }else if(spot.numReviews === 0) {
      return <h2>★ New</h2>
    }else {
      return <h2>★ {parseFloat(spot.avgStarRating)?.toFixed(1)} · {spot.numReviews} Reviews</h2>
    }
  }

  if(!spot) return null

  return (
    <div className="spot-detail-page">
      <h1>{spot.name}</h1>
      <p>{spot.city} {spot.state}, {spot.country}</p>
      {spot.SpotImages && spot.SpotImages.map(spotImage => (
        <div className="spot-images-container">
          <img className="main-image" src={spotImage.url}/>
        </div>
      ))}
      <div className="detail-container">
        <div className="host-description-container">
          <p className="host-description-p">Hosted by: {spot?.Owner?.firstName} {spot?.Owner?.lastName}</p>
          <p className="host-description-p1">{spot.description}</p>
        </div>
        <div className="callout-box">
          <p className="review-count-rating">{reviewCount()}</p>
          <p>${spot.price} night</p>
          <button className='reserve-button' onClick={handleClickReserveButton}>Reserve</button>
        </div>
      </div>
    <div>
      {reviewCount()}
      <ul>
        {
          addReviews()
        }
      </ul>
    </div>
      <button onClick={handleClickReserveButton} className="reserve-button">Reserve</button>
    </div>
  )
}
