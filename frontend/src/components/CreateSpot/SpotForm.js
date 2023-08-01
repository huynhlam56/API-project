import { useDispatch } from "react-redux";
import { createSpot, editSpotThunk } from "../../store/spots";
import { useState } from "react";
import { nanoid } from 'nanoid'

const SpotForm = ({spot, formType}) => {
  const dispatch = useDispatch()
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({});
    const newSpot = {
      id: nanoid(),
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    }
    dispatch(createSpot(newSpot))
  }
  return (
    <div className="inputBox">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <section>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>
          <input
            type='text'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="address"
            name='address'
          />
          <input
            type='text'
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="city"
            name='city'
          />
          <input
            type='text'
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="state"
            name='state'
          />
          <input
            type='text'
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder="country"
            name='country'
          />
          <input
            type='text'
            onChange={(e) => setLat(e.target.value)}
            value={lat}
            placeholder="latitude"
            name='latitude'
          />
          <input
            type='text'
            onChange={(e) => setLng(e.target.value)}
            value={lng}
            placeholder="longitude"
            name='longitude'
          />
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
          />
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
          />
        </section>
        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input
          type='text'
          placeholder="Preview Image URL"
          />
          <input
            type='text'
            placeholder="Image URL"
          />
          <input
            type='text'
            placeholder="Image URL"
          />
          <input
            type='text'
            placeholder="Image URL"
          />
        </section>
      <button type='submit' value='Create Spot' >Submit</button>
      </form>
    </div>
  )
}

export default SpotForm;
