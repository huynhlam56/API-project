import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import SpotForm from "../CreateSpot/SpotForm"
import { getSpotDetailThunk } from "../../store/spots";


const UpdateSpotForm = () => {
	const { spotId } = useParams()
	const dispatch = useDispatch()

	const spot = useSelector((state) => (state.spots ? state.spots?.userSpots[spotId] : {}))
	dispatch(getSpotDetailThunk(spot.id))

	if(!spot) return null

	return (
		<>
			<SpotForm
				spot={spot}
				formType='Update Spot'
			/>
		</>

	)
}

export default UpdateSpotForm;
