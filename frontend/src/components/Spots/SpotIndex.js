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
          {Object.values(spots.allSpots).map((spot) => (
            <li key={spot.id}>
              <img className="preview-images" src={spot.previewImage !== "No preview image" ? spot.previewImage : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}/>
              <p>{spot.city}, {spot.state}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SpotIndex;
