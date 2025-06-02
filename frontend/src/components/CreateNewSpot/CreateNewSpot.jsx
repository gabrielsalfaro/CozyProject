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
        <h1>Create a new Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <input type="text" className="new-spot-country" placeholder="Country" />
        <input type="text" className="new-spot-address" placeholder="Address" />
        <input type="text" className="new-spot-city" placeholder="City" />
        <input type="text" className="new-spot-state" placeholder="STATE" />
        <input type="text" className="new-spot-latitude" placeholder="Latitude" />
        <input type="text" className="new-spot-longitude" placeholder="Longitude" />
        <hr />
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
        <input type="text" className="new-spot-description" placeholder="Please write at least 30 characters" />
        <hr />
        <h2>Create a title for your spot</h2>
        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <input type="text" className="new-spot-title" placeholder="Name of your spot" />
        <hr />
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <span>$ <input type="text" className="new-spot-price" placeholder="Price per nigiht (USD)"/> </span>
        <hr />
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input type="text" className="new-spot-image" placeholder="Preview Image URL"/>
        <input type="text" className="new-spot-image" placeholder="Image URL"/>
        <input type="text" className="new-spot-image" placeholder="Image URL"/>
        <input type="text" className="new-spot-image" placeholder="Image URL"/>
        <input type="text" className="new-spot-image" placeholder="Image URL"/>
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