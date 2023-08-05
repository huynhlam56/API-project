import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"



import SpotForm from "../CreateSpot/SpotForm"


const UpdateSpotForm = () => {
	const { spotId } = useParams()

	const spot = useSelector((state) => (state.spots ? state.spots.allSpots[spotId] : {}))
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
