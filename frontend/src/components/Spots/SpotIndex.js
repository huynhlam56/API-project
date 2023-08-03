import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



import { fetchAllSpots } from "../../store/spots";

const SpotIndex = () => {

  const spots = useSelector((state) => (state.spots ? state.spots : {}))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllSpots())
  }, [dispatch]);


  return (
    <div>
      <ul id='spot-tiles'>
        {Object.values(spots.allSpots).map((spot) => (
          <a href={`/spots/${spot.id}`}>
            <li id='individual-spot'key={spot.id}>
              <img className="preview-images" src={spot.previewImage !== "No preview image" ? spot.previewImage : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}/>
              <div id='spot-properties'>
                <span id='name-rating'>
                  <h3>{spot.name}</h3>
                  <p>★{spot.avgRating ? spot.avgRating : 'New'}</p>
                </span>
                <span id='location-price'>
                  <p id='location'>{spot.city}, {spot.state}</p>
                  <p id='price'>${spot.price} night</p>
                </span>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  )
}

export default SpotIndex;
