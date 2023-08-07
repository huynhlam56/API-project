

const SpotTile = ({ spot }) => {
  return (
    <div>
      <a href={`/spots/${spot.id}`}>
        <li id='individual-spot'key={spot.id}>
          <img className="preview-images" src={spot.previewImage !== "No preview image" ? spot.previewImage : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}/>
          <div id='spot-properties'>
            <div id='location-price'>
              <p id='location'>{spot.city}, {spot.state}</p>
              <p id='price'>
                <strong>${spot.price}</strong> night</p>
            </div>
            <div id='name-rating'>
              <p className="star">★{spot?.avgRating !== 'No reviews' ? spot.avgRating : 'New'}</p>
            </div>
          </div>
        </li>
      </a>
    </div>
  )
}

export default SpotTile
