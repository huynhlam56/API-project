import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModalReview from "./ConfirmationModalReview";
import { deleteReviewThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";

const RemoveReview = ({ review }) => {
  const dispatch = useDispatch()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const reviews = useSelector(state => state)
  const history = useHistory()

  const handleRemoveReview = () => {
      setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
    dispatch(deleteReviewThunk(review.id)).then(() => {
      setShowConfirmation(false)
      history.push(`/spots/${review.spotId}`)
    }
    )
  }

  const handleCancelDelete = () => {
      setShowConfirmation(false)
  }

  return(
    <div>
      <button className='delete-button' onClick={handleRemoveReview}>Delete</button>

      {showConfirmation && (
        <ConfirmationModalReview
          title='Confirm Delete'
          message='Are you sure you want to remove this review?'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  )
}

export default RemoveReview;
