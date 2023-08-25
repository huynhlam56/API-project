import { useDispatch, useSelector } from "react-redux";
import { createSpot, createSpotImageThunk, updateSpot } from "../../store/spots";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SpotForm = ({spot, formType}) => {
  const singleSpot = useSelector((state) => state.spots?.singleSpot?.SpotImages)
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
        dispatch(createSpotImageThunk(createdSpot.id, previewImage, true))
        dispatch(createSpotImageThunk(createdSpot.id, imageUrlA, false))
        dispatch(createSpotImageThunk(createdSpot.id, imageUrlB, false))
        dispatch(createSpotImageThunk(createdSpot.id, imageUrlC, false))
        dispatch(createSpotImageThunk(createdSpot.id, imageUrlD, false))

        if(createdSpot) {
          history.push(`/spots/${createdSpot.id}`);
        }
      } catch (error) {
        const data = await error.json();
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
        <section>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>
          <input
            type='text'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="address"
            name='address'
            required
          />
         {errors.address && <p className="error-message">*{errors.address}*</p>}
          <input
            type='text'
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="city"
            name='city'
            required
          />
           {errors.city && <p className="error-message">*{errors.city}*</p>}
          <input
            type='text'
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="state"
            name='state'
            required
          />
           {errors.state && <p className="error-message">*{errors.state}*</p>}
          <input
            type='text'
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder="country"
            name='country'
            required
          />
           {errors.country && <p className="error-message">*{errors.country}*</p>}
          <input
            type='text'
            onChange={(e) => setLat(e.target.value)}
            value={lat}
            placeholder="latitude"
            name='latitude'
            required
          />
           {errors.lat && <p className="error-message">*{errors.lat}*</p>}
          <input
            type='text'
            onChange={(e) => setLng(e.target.value)}
            value={lng}
            placeholder="longitude"
            name='longitude'
            required
          />
           {errors.lng && <p className="error-message">*{errors.lng}*</p>}
        </section>
        <section>
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
          <input
            type='text'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Please write at least 30 characters."
            name='description'
            required
          />
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
        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input
          type='text'
          placeholder="Preview Image URL"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          />
          <input
            type='text'
            placeholder="Image URL"
            value={imageUrlA}
            onChange={(e) => setImageUrlA(e.target.value)}
          />
          <input
            type='text'
            placeholder="Image URL"
            value={imageUrlB}
            onChange={(e) => setImageUrlB(e.target.value)}
          />
          <input
            type='text'
            placeholder="Image URL"
            value={imageUrlC}
            onChange={(e) => setImageUrlC(e.target.value)}
          />
          <input
            type='text'
            placeholder="Image URL"
            value={imageUrlD}
            onChange={(e) => setImageUrlD(e.target.value)}
          />
        </section>
      <button onSubmit={handleSubmit} type='submit'>{formType}</button>
      </form>
    </div>
  )
}

export default SpotForm;
