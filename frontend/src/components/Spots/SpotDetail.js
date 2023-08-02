import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getSpotDetailThunk } from "../../store/spots";


export const SpotDetail = () => {
  const dispatch = useDispatch()
  const spot = useSelector(state => state.spots.singleSpot)

  const { spotId } = useParams()
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    console.log('I AM WORKING')
    dispatch(getSpotDetailThunk(spotId))
  }, [dispatch, spotId])

  const handleClickReserveButton = () => {
    alert('Feature coming soon!')
  }
  if(!spotId) return null

  return (
    <div>
      <h1>{spot.name}</h1>
      <p>★{spot.avgStarRating}</p>
      <p>{spot.city} {spot.state}, {spot.country}</p>
      {spot.SpotImages && spot.SpotImages.map(spotImage => (
        <img src={spotImage.url}/>
      ))}
      <p>Hosted by: Huynh Lam</p>
      <p>{spot.description}</p>
      <div className="callout-box">
        ${spot.price} night
        <button onClick={handleClickReserveButton} className="reserve-button">Reserve</button>
      </div>
    </div>
  )
}
