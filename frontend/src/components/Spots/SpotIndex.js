import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import { fetchAllSpots } from "../../store/spots";

const SpotIndex = () => {

  const spots = useSelector((state) => (state.spots ? state.spots : {}))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllSpots())
  }, [dispatch]);


  return (
    <div>
      <ul>
        {Object.values(spots.allSpots).map((spot) => (
          <Link to={`/spots/${spot.id}`} key={spot.id}>
            <li>
              <img className="preview-images" src={spot.previewImage !== "No preview image" ? spot.previewImage : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}/>
              <h3>{spot.name}</h3>
              <p>{spot.city}, {spot.state}</p>
              <p>Rating: {spot.avgRating ? spot.avgRating : 'New'} *ADD STAR EMOJI HERE*</p>
              <p>${spot.price} night</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default SpotIndex;
