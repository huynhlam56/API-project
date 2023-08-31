import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import spotsReducer, { getSpotDetailThunk } from "../../store/spots";
import SpotForm from "../CreateSpot/SpotForm";
import ConfirmationModal from "../RemoveSpot/ConfirmationModal";
import { deleteReviewThunk, loadAllReviewsThunk } from "../../store/reviews";
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
  // const [deleteReviews, setDeleteReviews] = useState(allReviews)

  useEffect(() => {

    dispatch(getSpotDetailThunk(spotId))
    dispatch(loadAllReviewsThunk(spotId)).catch(async(res) => {return})

    // return() => {
    //   if (deleteReviews !== null) {
    //     dispatch(deleteReviewThunk(deleteReviews))
    //   }
    // }
  }, [dispatch, spotId])

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
          Object.keys(sessionUser).length !== 0 && !userReview && sessionUser.id !== spot?.ownerId
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

  const reviewCount = () => {
    if (spot.numReviews === 1) {
      return <h2 className="display-review-rating-count">★ {parseFloat(spot.avgStarRating)?.toFixed(1)} · {spot.numReviews} Review</h2>
    }else if(spot.numReviews === 0) {
      return <h2>★ New</h2>
    }else {
      return <h2>★ {parseFloat(spot.avgStarRating)?.toFixed(1)} · {spot.numReviews} Reviews</h2>
    }
  }

  const showReviews = (review) => {
    const dateObj = new Date(review.createdAt)
    const newDate = dateObj.toDateString()

    return (
      <li  className="each-review" key={review.id}>
        <div>
          <p className="reviewer-name">{`${review.User.firstName} ${review.User.lastName}`}</p>
          <p className="review-date">{newDate}</p>
          <p className="review">{review.review}</p>
          <p>
            {Object.keys(sessionUser).length !== 0 && sessionUser.id === review.userId
            ?
            <RemoveReview review={review}/>
            :
            null
            }
          </p>
        </div>
      </li>
    )
  }


  if(Object.keys(spot).length === 0) return null

  return (
    <div className="spot-detail-page">
      <h1 className="spot-name">{spot.name}</h1>
      <p>{spot.city} {spot.state}, {spot.country}</p>
      <div className="spot-images-container">
        <div className="main-image">
          <img className="big-image" src={spot.SpotImages.previewImage}/>
        </div>
        <div className="small-img-container">
          <div className="cols-small-images">
            <img className="small-image" src={spot.SpotImages.smallImages[0]}/>
            <img className="small-image" src={spot.SpotImages.smallImages[1]}/>
          </div>
          <div className="rows-small-images">
            <img className="small-image" src={spot.SpotImages.smallImages[2]}/>
            <img className="small-image" src={spot.SpotImages.smallImages[3]}/>
          </div>
        </div>
      </div>
      <div className="detail-container">
        <div className="host-description-container">
          <p className="host-description-p">Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</p>
          <p className="host-description-p1">{spot.description}</p>
        </div>
        <div className="callout-box">
          <div className="price-rating-container">
            <p className="night"><span className="price">${spot.price}</span> night</p>
            <p className="review-count-rating">{reviewCount()}</p>
          </div>
          <button className='reserve-button' onClick={handleClickReserveButton}>Reserve</button>
        </div>
      </div>
      <div className="rating-container">
        {reviewCount()}
        <ul>
          {addReviews()}
        </ul>
      </div>
    </div>
  )
}
