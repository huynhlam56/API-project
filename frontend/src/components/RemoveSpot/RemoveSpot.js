import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeSpotThunk } from "../../store/spots";
import ConfirmationModal from "./ConfirmationModal";
import { useHistory } from "react-router-dom";

const RemoveSpot = ({ spot }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleRemmoveSpot = () => {
      setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
      dispatch(removeSpotThunk(spot.id))
      setShowConfirmation(false)
      history.push('/')
  }

  const handleCancelDelete = () => {
      setShowConfirmation(false)
  }

  return(
    <div>
      <button className='remove-spot-button' onClick={handleRemmoveSpot}>Delete</button>

      {showConfirmation && (
        <ConfirmationModal
          title='Confirm Delete'
          message='Are you sure you want to remove this spot?'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  )
}

export default RemoveSpot;
