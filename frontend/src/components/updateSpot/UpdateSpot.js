import { useParams } from "react-router-dom";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


import SpotForm from "../CreateSpot/SpotForm"
import { SpotDetail } from "../Spots/SpotDetail";

const UpdateSpotForm = () => {
	const { spotId } = useParams()
	const spot = useSelector((state) => (state.spots ? state.spots : {}))
	console.log(spot, 'SPOT: IN UPDATE SPOT FORM')

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(SpotDetail(spotId))
	},[dispatch, spotId])

	if(!spot) return null

	return (
		Object.keys(spot).length > 1 && (
			<>
				<SpotForm
					spot={spot}
					formType='Update Spot'
				/>
			</>
		)
	)
}

export default UpdateSpotForm;
