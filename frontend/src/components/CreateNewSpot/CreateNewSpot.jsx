import { useState, useEffect } from 'react';
import { createSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import { updateSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchSingleSpotWithReviews } from '../../store/spots';
import { addSpotImage } from '../../store/spots';
import './CreateNewSpot.css'

const CreateNewSpot = () => {
  const spot = useSelector(state => state.spots.singleSpot);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();
  const [country, setCountry] = useState(spot?.country || '');
  const [address, setAddress] = useState(spot?.address || '');
  const [city, setCity] = useState(spot?.city || '');
  const [stateName, setStateName] = useState(spot?.stateName || '');
  const [lat, setLatitude] = useState(spot?.lat || '');
  const [lng, setLongitude] = useState(spot?.lng || '');
  const [description, setDescription] = useState(spot?.description || '');
  const [name, setName] = useState(spot?.name || '');
  const [price, setPrice] = useState(spot?.price || '');
  const [images, setImages] = useState(['', '', '', '', '']);
  const [errors, setErrors] = useState({});  

  useEffect(() => {
    if (spotId) {
      dispatch(fetchSingleSpotWithReviews(spotId));
    }
  }, [dispatch, spotId]);
  
  useEffect(() => {
    if (!spotId) {
      setCountry('');
      setAddress('');
      setCity('');
      setStateName('');
      setLatitude('');
      setLongitude('');
      setDescription('');
      setName('');
      setPrice('');
      setImages(['', '', '', '', '']);
      setErrors({});
    } else {
      dispatch(fetchSingleSpotWithReviews(spotId));
    }
  }, [dispatch, spotId]);

  useEffect(() => {
  if (spot && spot.id === +spotId) {
    setCountry(spot.country || '');
    setAddress(spot.address || '');
    setCity(spot.city || '');
    setStateName(spot.state || '');
    setLatitude(spot.lat?.toString() || '');
    setLongitude(spot.lng?.toString() || '');
    setDescription(spot.description || '');
    setName(spot.name || '');
    setPrice(spot.price?.toString() || '');
    setImages(
      spot.SpotImages && spot.SpotImages.length > 0
        ? spot.SpotImages.map((img) => img.url).concat(Array(5).fill('')).slice(0, 5)
        : ['', '', '', '', '']
    );
  }
}, [spot, spotId]);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

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
    if (!price.toString().trim()) validation.price = 'Price is required';
    if (!images.length || !images[0]?.trim()) {
      validation.images = 'Preview image is required';
    }

    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    try {
      let result;

      if (spotId && spot) {
        // Update existing spot
        result = await dispatch(updateSpot({
          id: spot.id,
          country,
          address,
          city,
          state: stateName,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          description,
          name,
          price: parseFloat(price),
          previewImage: images[0] || ''
        }));
      } else {
        // Create new spot
        result = await dispatch(createSpot({
          country,
          address,
          city,
          state: stateName,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          description,
          name,
          price: parseFloat(price)
        }));
      }

      // Add each image to spot
      if (Array.isArray(images)) {
        for (let i = 0; i < images.length; i++) {
          const imageUrl = images[i];
          if (imageUrl.trim()) {
            await dispatch(addSpotImage(result.id, {
              url: imageUrl,
              preview: i === 0 // update to give a choice for preview image
            }));
          } // elif (!imageUrl.trim()) {
            // await dispatch(removeSpotImage(result.id, {
              // url: ''
              // preview: 0
            // }))
          // }
        }
      }

      // console.log('Spot created:', newSpot);
      await dispatch(fetchSpots()); // refresh after creating?
      navigate(`/spots/${result.id}`)
    } catch (res) {
      if (res && res.errors) {
        setErrors(res.errors);
      }
      console.error('Create/Update spot failed:', res);
    }
  }
  
    // give me demo data
    const fillDemoData = () => {
      setErrors({});
      setCountry('USA');
      setAddress('123 Test St');
      setCity('Testville');
      setStateName('CA');
      setLatitude('37.7749');
      setLongitude('-122.4194');
      setDescription('A lovely place with everything you need for a relaxing stay. Lots of space and natural light.');
      setName('Test Spot');
      setPrice('150');
      const imageList = [
        'https://i.imgur.com/sB7gAUY.jpeg', 
        'https://i.imgur.com/fx3yQZv.png', 
        'https://i.imgur.com/6SxR9dJ.jpeg',
        'https://i.imgur.com/aa8swRp.png',
        'https://i.imgur.com/phvt0GZ.png'
      ];
      const randomImages = Array(4)
        .fill(null)
        .map(() => imageList[Math.floor(Math.random() * imageList.length)]);

      setImages([...randomImages, '']);
    };

  // const [message, setMessage] = useState("");
    
  // const wip = (e) => {
  //     e.preventDefault();
  //     setMessage('working on it...')
  // }
    
  return (<>
  <div className="create-spot-container">
    <div className="new-spot-content">

        <h1 className="new-spot-title">{spotId ? 'Update your Spot' : 'Create a new Spot'}</h1>
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
            <span><b>Country</b></span>
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
            <span><b>Street Address</b></span>
            {errors.country && <span className="error-text">{errors.country}</span>}
          </div>
          <input 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text" 
            className="new-spot-address" 
            placeholder="Street Address" 
          />

          <div className="new-spot-city-state">
            <div className="city-div">
              <div className="label-with-error">
                <span><b>City</b></span>
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
                <span><b>State</b></span>
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
                <span><b>Latitude</b></span>
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
                <span><b>Longitude</b></span>
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
          placeholder="Please write at lease 30 characters"
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
          {images.map((url, idx) => (
            <input
              key={idx}
              type="text"
              value={url}
              onChange={(e) => handleImageChange(idx, e.target.value)}
              className="new-spot-image"
              placeholder={idx === 0 ? "Preview Image URL" : "Image URL"}
            />
          ))}
          {errors.images && <span className="error-text">{errors.images}</span>}
        </div>
        
        <hr />
        {/* {message && <p className="new-spot-message">{message}</p>} */}
        <div className="new-spot-button-container">
            <button className="new-spot-submit" onClick={handleSubmit}>{spotId ? 'Update Spot' : 'Create Spot'}</button>
        </div>
        
    </div>
  </div>
  </>
  )
}

export default CreateNewSpot;