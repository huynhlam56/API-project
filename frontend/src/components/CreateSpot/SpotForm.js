import { useDispatch, useSelector } from "react-redux";
import { createSpot, createSpotImageThunk, updateSpot } from "../../store/spots";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { loadAllReviewsThunk } from "../../store/reviews";

const SpotForm = ({spot, formType}) => {
  const dispatch = useDispatch()
  const [address, setAddress] = useState(spot?.address)
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state)
  const [country, setCountry] = useState(spot?.country)
  const [lat, setLat] = useState(spot?.lat)
  const [lng, setLng] = useState(spot?.lng)
  const [name, setName] = useState(spot?.name)
  const [description, setDescription] = useState(spot?.description)
  const [price, setPrice] = useState(spot?.price)
  const [errors, setErrors] = useState({})
  const history = useHistory()
  const [previewImage, setPreviewImage] = useState(spot?.previewImage)
  const [imageUrlA, setImageUrlA] = useState('')
  const [imageUrlB, setImageUrlB] = useState('')
  const [imageUrlC, setImageUrlC] = useState('')
  const [imageUrlD, setImageUrlD] = useState('')

  console.log(spot)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({});

    let newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage
    }

    if (formType === 'Update Spot') {
      try {
        newSpot.id = spot.id;
        const updatedSpot = await dispatch(updateSpot(newSpot));

        history.push(`/spots/${updatedSpot.id}`);
      } catch (error) {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    } else if (formType === 'Create A New Spot') {
      try {
        const createdSpot = await dispatch(createSpot(newSpot));
        await dispatch(createSpotImageThunk(createdSpot.id, previewImage, true))
        await dispatch(createSpotImageThunk(createdSpot.id, imageUrlA, false))
        await dispatch(createSpotImageThunk(createdSpot.id, imageUrlB, false))
        await dispatch(createSpotImageThunk(createdSpot.id, imageUrlC, false))
        await dispatch(createSpotImageThunk(createdSpot.id, imageUrlD, false))
        await dispatch(loadAllReviewsThunk(createdSpot.id))

        if(createdSpot) {
          history.push(`/spots/${createdSpot.id}`);
        }
      } catch (error) {
        const data = await error.json();
        console.log('ERROR:' , error)
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    }
  }

  return (
    <div className="inputBox">
      <h1>{formType}</h1>
      <form className='update-create-form'onSubmit={handleSubmit}>
        <div className="sections-container">
          <section>
          <h2>Where's your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>
            <div className="update-create-form-input">
              <input
                type='text'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="Street Address"
                name='address'
                required
              />
              {errors.address && <p className="error-message">*{errors.address}*</p>}
              <input
                type='text'
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="City"
                name='city'
                required
              />
              {errors.city && <p className="error-message">*{errors.city}*</p>}
              <input
                type='text'
                onChange={(e) => setState(e.target.value)}
                value={state}
                placeholder="State"
                name='state'
                required
              />
              {errors.state && <p className="error-message">*{errors.state}*</p>}
              <input
                type='text'
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                placeholder="Country"
                name='country'
                required
              />
              {errors.country && <p className="error-message">*{errors.country}*</p>}
              <input
                type='text'
                onChange={(e) => setLat(e.target.value)}
                value={lat}
                placeholder="Latitude"
                name='latitude'
                required
              />
              {errors.lat && <p className="error-message">*{errors.lat}*</p>}
              <input
                type='text'
                onChange={(e) => setLng(e.target.value)}
                value={lng}
                placeholder="Longitude"
                name='longitude'
                required
              />
              {errors.lng && <p className="error-message">*{errors.lng}*</p>}
            </div>
          </section>
        <section>
          <h2>Describe your place to guests</h2>
          <p className="input-description">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
          <div className="update-create-form-input">
            <textarea className='description-textbox' rows='4' col='5'
              type='text'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Please write at least 30 characters."
              name='description'
              required
              />
            {errors.description && <p className="error-message">*{errors.description}</p>}
          </div>
        </section>
        <section>
          <h2>Create a title for your spot</h2>
          <p>Catch guest's attention with a spot title that highlights what makes your place special</p>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name of your spot"
            name='name'
            required
            />
          {errors.name && <p className="error-message">*{errors.name}*</p>}
        </section>
        <section>
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank heigh in search results</p>
          <input
            type='number'
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="Price per night (USD)"
            name='price'
            required
          />
          {errors.price && <p className="error-message">*{errors.price}*</p>}
        </section>
        {formType === 'Create A New Spot' ? (
          <section>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot</p>
            <div className="update-create-form-input">
              <input
              type='url'
              placeholder="Preview Image URL"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
              />
              <input
                type='url'
                placeholder="Image URL"
                value={imageUrlA}
                onChange={(e) => setImageUrlA(e.target.value)}
                required
              />
              <input
                type='url'
                placeholder="Image URL"
                value={imageUrlB}
                onChange={(e) => setImageUrlB(e.target.value)}
                required
              />
              <input
                type='url'
                placeholder="Image URL"
                value={imageUrlC}
                onChange={(e) => setImageUrlC(e.target.value)}
                required
              />
              <input
                type='url'
                placeholder="Image URL"
                value={imageUrlD}
                onChange={(e) => setImageUrlD(e.target.value)}
                required
              />
            </div>
          </section>
        ) : null }
      </div>
        <button className="create-update-button" onSubmit={handleSubmit} type='submit'>{formType === 'Create A New Spot' ? 'Create Spot' : 'Update Spot'}</button>
      </form>
    </div>
  )
}

export default SpotForm;
