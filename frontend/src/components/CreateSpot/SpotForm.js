import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";
import { useState } from "react";
import { nanoid } from 'nanoid'

const SpotForm = () => {
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
      <h1>Create Spot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          name='address'
        />
        <input
        type='text'
        onChange={(e) => setCity(e.target.value)}
        value={city}
        name='city'
      />
      <input
        type='text'
        onChange={(e) => setState(e.target.value)}
        value={state}
        name='state'
      />
      <input
        type='text'
        onChange={(e) => setCountry(e.target.value)}
        value={country}
        name='country'
        />
      <input
        type='text'
        onChange={(e) => setLat(e.target.value)}
        value={lat}
        name='latitude'
      />
      <input
        type='text'
        onChange={(e) => setLng(e.target.value)}
        value={lng}
        name='longitude'
      />
      <input
        type='text'
        onChange={(e) => setName(e.target.value)}
        value={name}
        name='name'
      />
      <input
        type='text'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        name='description'
      />
      <input
        type='text'
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        name='price'
      />
      <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SpotForm;
