import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeSpotThunk } from "../../store/spots";
import ConfirmationModal from "./ConfirmationModal";

const RemoveSpot = ({ spot }) => {
  const dispatch = useDispatch()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleRemmoveSpot = () => {
      setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
      dispatch(removeSpotThunk(spot.id))
      setShowConfirmation(false)
  }

  const handleCancelDelete = () => {
      setShowConfirmation(false)
  }

  return(
    <div>
      <h3>{spot.name}</h3>
      <p>{spot.city}, {spot.state}</p>
      <button onClick={handleRemmoveSpot}>Delete</button>

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
