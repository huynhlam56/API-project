import { useParams } from "react-router-dom";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


import SpotForm from "../CreateSpot/SpotForm"
import { SpotDetail } from "../Spots/SingleSpot";

const EditSpot = () => {
	const { spotId } = useParams()
	const spot = useSelector((state) => (state.spots ? state.spots : {}))

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(SpotDetail(spotId))
	},[dispatch, spotId])

	if(!spot) return null


}
