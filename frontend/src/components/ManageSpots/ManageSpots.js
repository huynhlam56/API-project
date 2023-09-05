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

    const userSpots = useSelector((state) => state.spots?.userSpots)
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
            <div className="manage-spots-container">
                    {userSpots && Object.values(userSpots)?.length !== 0 ? Object.values(userSpots)?.map((spot) => (
                        <div key={spot.id} >
                            <h1 className="manage-spot-name">{spot.name}</h1>
                            <img className='manage-spots-img' src={spot.previewImage} />
                            <p>★ {spot.avgRating ? spot.avgRating : 'New'}</p>
                            <p>{spot.city}, {spot.state}</p>
                            <p>
                                <strong>${spot.price} </strong>
                                night
                            </p>
                            <div className="update-remove-buttons">
                                <button className='update-spot-button' data-id={spot.id} onClick={handleUpdateBtn}>Update Spot</button>
                                <RemoveSpot spot={spot} />
                            </div>
                        </div>
                    )) :
                        <button className='create-new-spot-button-in-manage-form' onClick={handleCreateSpot}>Create A New Spot</button>
                    }
            </div>
        </div>
    )
}

export default ManageSpots;
