import { useState } from 'react';
import './CreateNewSpot.css'

const CreateNewSpot = () => {
    const [message, setMessage] = useState("");

    const wip = (e) => {
        e.preventDefault();
        setMessage('working on it...')
    }
    
  return (<>
  <div className="create-spot-container">
    <div className="new-spot-content">
        <h1 className="new-spot-title">Create a new Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <div className="new-spot-location-container">
          <p>Country</p>
          <input type="text" className="new-spot-country" placeholder="Country" />
          <p>Street Address</p>
          <input type="text" className="new-spot-address" placeholder="Address" />
          <div className="new-spot-city-state">
            <div className="city-div">
              <div>City</div>
              <div className="new-spot-city">
                <input type="text"  placeholder="City" /> , 
              </div>
            </div>
            <div className="state-div">
              <p>State</p>
              <input type="text" className="new-spot-state" placeholder="STATE" />
            </div>
            
          </div>
          <div className="new-spot-lat-long">
            <div className="lat-div">
              <p>Latitude</p>
              <div className="new-spot-lat">
                <input type="text" className="new-spot-latitude" placeholder="Latitude" />, 
              </div>
             
            </div>
            <div className="long-div">
              <p>Longitude</p>
              <input type="text" className="new-spot-longitude" placeholder="Longitude" />
            </div>
            
          </div>
          
        </div>
        
        <hr />
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
        <input type="text" className="new-spot-description" placeholder="Description" />
        <hr />
        <h2>Create a title for your spot</h2>
        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <input type="text" className="new-spot-name" placeholder="Name of your spot" />
        <hr />
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div className="new-spot-price-container">
          $ <input type="text" className="new-spot-price" placeholder="Price per nigiht (USD)"/>
        </div>

        <hr />
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className="new-spot-images-container">
          <input type="text" className="new-spot-image" placeholder="Preview Image URL"/>
          <input type="text" className="new-spot-image" placeholder="Image URL"/>
          <input type="text" className="new-spot-image" placeholder="Image URL"/>
          <input type="text" className="new-spot-image" placeholder="Image URL"/>
          <input type="text" className="new-spot-image" placeholder="Image URL"/>
        </div>
        
        <hr />
        {message && <p className="new-spot-message">{message}</p>}
        <div className="new-spot-button-container">
            <button className="new-spot-submit" onClick={wip}>Create Spot</button>
        </div>
        
    </div>
  </div>
  </>
  )
}

export default CreateNewSpot