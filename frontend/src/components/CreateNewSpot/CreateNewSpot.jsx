import { useState } from 'react';
import { createSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import './CreateNewSpot.css'

const CreateNewSpot = () => {
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [lat, setLatitude] = useState('');
  const [lng, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  const validation = {};

  if (!country.trim()) validation.country = 'Country field is required';
  if (!address.trim()) validation.address = 'Address is required';
  if (!city.trim()) validation.city = 'City is required';
  if (!stateName.trim()) validation.stateName = 'State is required';
  if (!lat.trim()) validation.latitude = 'Latitude is required';
  if (!lng.trim()) validation.longitude = 'Longitude is required';
  if (!description.trim() || description.length < 30) validation.description = 'Description needs a minimum of 30 characters';
  if (!name.trim()) validation.name = 'Name is required';
  if (!price.trim()) validation.price = 'Price is required';
  if (!images.trim()) validation.images = 'Preview image is required';

  setErrors(validation);
  if (Object.keys(validation).length > 0) return;

  try {
    const newSpot = await dispatch(createSpot({
      country,
      address,
      city,
      state: stateName,
      lat,
      lng,
      description,
      name,
      price,
      previewImage: images
    }));
    console.log('Spot created:', newSpot);
    // route to newly created spot here?
    await dispatch(fetchSpots()); // refresh after creating?
    navigate('/')
  } catch (res) {
    if (res && res.errors) {
      setErrors(res.errors);
    }
    console.error('Create spot failed:', res);
  }
}
  
    // give me demo data
    const fillDemoData = () => {
      setCountry('USA');
      setAddress('123 Test St');
      setCity('Testville');
      setStateName('CA');
      setLatitude('37.7749');
      setLongitude('-122.4194');
      setDescription('A lovely place with everything you need for a relaxing stay. Lots of space and natural light.');
      setName('Test Spot');
      setPrice('150');
      setImages('https://i.imgur.com/sB7gAUY.jpeg');
    };
    
  // const [message, setMessage] = useState("");
    
  // const wip = (e) => {
  //     e.preventDefault();
  //     setMessage('working on it...')
  // }
    
  return (<>
  <div className="create-spot-container">
    <div className="new-spot-content">

        <h1 className="new-spot-title">Create a new Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <div className="new-spot-location-container">
          <center>
          <button 
          style={{padding: '10px 0', justifyContent: 'center'}}
          type="button" 
          onClick={fillDemoData} 
          className="demo-fill-button">
            Fill Demo Data
          </button>
          </center>
          <div className="label-with-error">
            <span>Country</span>
            {errors.country && <span className="error-text">{errors.country}</span>}
          </div>
          <input 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
            type="text" 
            className="new-spot-country" 
            placeholder="Country" 
          />

          <div className="label-with-error">
            <span>Street Address</span>
            {errors.country && <span className="error-text">{errors.country}</span>}
          </div>
          <input 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text" 
            className="new-spot-address" 
            placeholder="Address" 
          />

          <div className="new-spot-city-state">
            <div className="city-div">
              <div className="label-with-error">
                <span>City</span>
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              <div className="new-spot-city">
                <input 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"  
                placeholder="City" 
                /> , 
              </div>
            </div>

            <div className="state-div">
              <div className="label-with-error">
                <span>State</span>
                {errors.stateName && <span className="error-text">{errors.stateName}</span>}
              </div>
              <input 
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                type="text" 
                className="new-spot-state" 
                placeholder="STATE" 
              />
            </div>
          </div>

          <div className="new-spot-lat-long">
            <div className="lat-div">
              <div className="label-with-error">
                <span>Latitude</span>
                {errors.latitude && <span className="error-text">{errors.latitude}</span>}
              </div>
              <div className="new-spot-lat">
                <input 
                  value={lat}
                  onChange={(e) => setLatitude(e.target.value)}
                  type="text" 
                  className="new-spot-latitude" 
                  placeholder="Latitude" 
                />, 
              </div>
            </div>

            <div className="long-div">
              <div className="label-with-error">
                <span>Longitude</span>
                {errors.longitude && <span className="error-text">{errors.longitude}</span>}
              </div>
              <input 
                value={lng}
                onChange={(e) => setLongitude(e.target.value)}
                type="text" 
                className="new-spot-longitude" 
                placeholder="Longitude" 
              />
            </div>
          </div>
        </div>

        <hr />

        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
        
        <textarea
          className="new-spot-description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errors.description && <span className="error-text">{errors.description}</span>}

        <hr />

        <h2>Create a title for your spot</h2>
        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text" 
          className="new-spot-name" 
          placeholder="Name of your spot" 
        />
        {errors.name && <span className="error-text">{errors.name}</span>}

        <hr />

        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

        <div className="new-spot-price-container">
          $ <input 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text" 
          className="new-spot-price" 
          placeholder="Price per night (USD)" 
        />
        </div>
        {errors.price && <span className="error-text">{errors.price}</span>}


        <hr />

        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className="new-spot-images-container">
          <input 
            value={images}
            onChange={(e) => setImages(e.target.value)}
            type="text" 
            className="new-spot-image" 
            placeholder="Preview Image URL" 
          />
          {errors.images && <span className="error-text">{errors.images}</span>}
          <input type="text" className="new-spot-image" placeholder="Image URL"/>
          <input type="text" className="new-spot-image" placeholder="Image URL"/>
          <input type="text" className="new-spot-image" placeholder="Image URL"/>
          <input type="text" className="new-spot-image" placeholder="Image URL"/>
        </div>
        
        <hr />
        {/* {message && <p className="new-spot-message">{message}</p>} */}
        <div className="new-spot-button-container">
            <button className="new-spot-submit" onClick={handleSubmit}>Create Spot</button>
        </div>
        
    </div>
  </div>
  </>
  )
}

export default CreateNewSpot;