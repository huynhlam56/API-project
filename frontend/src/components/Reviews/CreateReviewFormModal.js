import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { createReviewThunk } from "../../store/reviews";
import { StarRating } from "./StarRating";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function CreateReviewFormModal() {
  const dispatch = useDispatch()
  const [review, setReview] = useState("")
  const [stars, setStars] = useState(0)
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()
  const spot = useSelector(state => state.spots.singleSpot)
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const onClick = (index) => {
    setStars(index)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    dispatch(createReviewThunk(
      spot.id,
      user,
      review,
      stars
    ))
    .then(() => {
      closeModal()
    })
    .catch(async(res) => {
      const data = await res.json()
      if(data && data.errors) {
        setErrors(data.errors);
      }
    })
  }

  return (

    <div>
      <h2 className="create-review-title">How was your stay?</h2>
      <form onSubmit={handleSubmitReview}>
        <textarea
          name='text'
          rows='5'
          cols='60'
          placeholder='Leave your review here...'
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required >
        </textarea>
        {errors.review && <p>{errors.review}</p>}
        <div id="star-buttons">
          <h3 className="star-word">
            Stars
          </h3>
            <StarRating
              stars={stars}
              onClickStars={(index) => onClick(index)}
            />
        </div>
        <button className='submit-review-button' onSubmit={handleSubmitReview} disabled={review.length < 10 || stars === 0} type="submit">Submit Your Review</button>
      </form>
    </div>
  )

}

export default CreateReviewFormModal;
