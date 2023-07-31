import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { fetchAllSpots } from "../../store/spots";

const SpotIndex = () => {
  const spots = useSelector((state) => (state.spots ? state.spots : {}))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllSpots())
  }, [dispatch]);

  console.log(spots, "Ive rendered!!!")

  return (
    <div>
      <ul>
          {Object.values(spots).map((spot) => (
            <li key={spot.id}>
              <h2>{spot.name}</h2>
              <p>{spot.description}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SpotIndex;
