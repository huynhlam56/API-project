import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotTile from "./SpotTile";
import Popup from 'reactjs-popup';

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
          <div className="toolTip" key={spot.id}>
            <SpotTile spot={spot} />
            <span className="toolTipText">{spot.name}</span>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default SpotIndex;
