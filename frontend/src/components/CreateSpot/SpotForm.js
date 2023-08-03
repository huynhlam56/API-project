import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";
import { updateSpot } from "../../store/spots";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
  const [counter, setCounter] = useState(7)
  const [errors, setErrors] = useState({})
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({});

    const newSpot = {
      id: counter,
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
    if(formType === 'Update') {
      newSpot.id = spot.id
      dispatch(updateSpot(newSpot))
    } else if (formType === 'Create') {
      newSpot.id = counter
      dispatch(createSpot(newSpot))
      .then(setCounter((prevCounter => prevCounter + 1)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    history.push(`/spots/${newSpot.id}`)
  }

console.log(errors)
  return (
    <div className="inputBox">
      <h1>{formType}</h1>
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
            required
          />
         {errors.address && <p>*{errors.address}*</p>}
          <input
            type='text'
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="city"
            name='city'
            required
          />
           {errors.city && <p>*{errors.city}*</p>}
          <input
            type='text'
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="state"
            name='state'
            required
          />
           {errors.state && <p>*{errors.state}*</p>}
          <input
            type='text'
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder="country"
            name='country'
            required
          />
           {errors.country && <p>*{errors.country}*</p>}
          <input
            type='text'
            onChange={(e) => setLat(e.target.value)}
            value={lat}
            placeholder="latitude"
            name='latitude'
            required
          />
           {errors.lat && <p>*{errors.lat}*</p>}
          <input
            type='text'
            onChange={(e) => setLng(e.target.value)}
            value={lng}
            placeholder="longitude"
            name='longitude'
            required
          />
           {errors.lng && <p>*{errors.lng}*</p>}
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
          {errors.name && <p>*{errors.name}*</p>}
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
          {errors.price && <p>*{errors.price}*</p>}
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
          <input
            type='text'
            placeholder="Image URL"
          />
        </section>
      <button type='submit'>{formType}</button>
      </form>
    </div>
  )
}

export default SpotForm;
