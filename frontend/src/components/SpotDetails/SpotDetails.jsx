import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSingleSpot } from '../../store/spots';
import './SpotDetails.css';
import houseImage from '../../../dist/house-image.jpg'; // Placeholder image

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot);
  const [loading, setLoading] = useState(true);

  const currencyFormat = num =>
    '$' + Math.floor(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId)).finally(() => setLoading(false));
  }, [dispatch, spotId]);

  if (loading) return <p>Loading...</p>;
  if (!spot) return <p>Spot not found.</p>;

  // Get the spot images
  const spotImages = spot.SpotImages || [];
  const firstImage = spotImages[0]?.url || houseImage; // First image or fallback
  const remainingImages = spotImages.slice(1, 5); // Get the next 4 images
  const gridImages = [...remainingImages, ...Array(4 - remainingImages.length).fill({ url: houseImage })]; // Fill remaining spots with placeholder
  // console.log('spotImages: ', spotImages)
  // console.log('firstImage: ', firstImage)
  // console.log('remainingImages: ', remainingImages)
  // console.log('gridImages: ', gridImages)

  return (
    <>
      <div className="spot-details-container">
        <div className='spot-wrapper'>
          <div className='spot-name'>
            {spot.name}
          </div>
          <div className='spot-location'>
            {spot.city}, {spot.state}, {spot.country}
          </div>
          <div className="spot-images">
            <div className="spot-images-left">
              {/* grab first img from array, if none, grab placeholder */}
              <img src={firstImage} alt={spot.name} className="main-image" />
            </div>
            <div className="spot-images-right-container">
              <div className="spot-images-right-grid">
                 {/* grab remaining images from array, if none, grab placeholder */}
                {gridImages.map((img, index) => (
                  <img key={index} src={img.url} alt={`image ${index + 1}`} className={`grid-image-${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="spot-info-container">
            <div className="spot-host-desc">
              <div className="spot-host">
                Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
              </div>
              <div className='spot-description'>
                {spot.description}
              </div>
            </div>

            <div className='spot-reserve-container'>

              <div className="spot-reserve-info">
                <p className="spot-price">{currencyFormat(spot.price)}</p>
                <div className='spot-rating'>
                  Avg. rating: {spot.avgStarRating}
                </div>
              </div>

              <div className="spot-reserve-button">
                <button className="reserve-btn" onClick={() => alert('Coming Soon!')}>
                  Reserve
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpotDetails;
