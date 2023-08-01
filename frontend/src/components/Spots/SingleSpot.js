import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getSpotDetailThunk } from "../../store/spots";


export const spotDetail = () => {
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)

    console.log(spot, "SPOT!!!")

    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)

    console.log(sessionUser, " current user!!")

    useEffect(() => {
        dispatch(getSpotDetailThunk(spotId))
    }, [dispatch, spotId])

    if(!spot.id) return null

    return (
        <div>
            <h1>{singleSpot.name}</h1>
        </div>
    )
}
