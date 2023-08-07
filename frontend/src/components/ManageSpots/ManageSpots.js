import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadUserSpotsThunk } from "../../store/spots";
import { useDispatch } from "react-redux";
import RemoveSpot from "../RemoveSpot/RemoveSpot";
import { useHistory, useParams } from "react-router-dom";


const ManageSpots = () => {
    const { spotId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);

    const userSpots = useSelector((state) => state.spots.userSpots)

    const handleUpdateBtn = (e) => {
        const spotId = e.target.dataset.id
        history.push(`/spots/${spotId}/edit`)
    }

    const handleCreateSpot = (e) => {
        history.push('/spots')
    }
    useEffect(() => {
        dispatch(loadUserSpotsThunk())
    }, [dispatch])

    return (
        <div>
            <h2>Manage Spots</h2>
            {userSpots?.Spots?.length !== 0 ? userSpots?.Spots?.map((spot) => (
                <li key={spot.id} >
                    <img src={spot.previewImage} />
                    <h1>{spot.name}</h1>
                    <p>★{spot.avgRating}</p>
                    <p>{spot.description}</p>
                    <p>{spot.location}</p>
                    <p>${spot.price} night</p>
                    <button data-id={spot.id} onClick={handleUpdateBtn}>Update Spot</button>
                    <RemoveSpot spot={spot} />
                </li>
            ))
            :
            <button onClick={handleCreateSpot}>Create A New Spot</button>

            }
        </div>
    )
}

export default ManageSpots;
