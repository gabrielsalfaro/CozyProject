import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSingleSpotWithReviews } from '../../store/spots';
// import houseImage from '/house-image.jpg';
import Reviews from '../Reviews/Reviews'
import { FaRegStar, FaHome } from "react-icons/fa";
import './SpotDetails.css';

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot);
  const reviews = spot.Reviews || [];
  const [loading, setLoading] = useState(true);

  const currencyFormat = num =>
    '$' + Math.floor(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  useEffect(() => {
    dispatch(fetchSingleSpotWithReviews(spotId)).finally(() => setLoading(false));
  }, [dispatch, spotId]);


  if (loading) return <p>Loading...</p>;
  if (!spot) return <p>Spot not found.</p>;

  // Get the spot images
  // Need to reverse order so the most recent spot shows up first
  const spotImages = spot.SpotImages || [];
  const firstImage = spotImages[0]?.url || <FaHome />; // First image or fallback
  const remainingImages = spotImages.slice(1, 5); // Get the next 4 images
  const gridImages = [...remainingImages, ...Array(4 - remainingImages.length).fill(<FaHome /> )]; // Fill remaining spots with placeholder
  // console.log('spotImages: ', spotImages)
  // console.log('firstImage: ', firstImage)
  // console.log('remainingImages: ', remainingImages)
  // console.log('gridImages: ', gridImages)

  const averageStars =
    reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <>
      <div className="spot-details-container">
        <div className='spot-content'>

          <div >
            <div className='spot-name'>
              {spot.name}
            </div>
            <div className='spot-location'>
              {spot.city}, {spot.state}, {spot.country}
            </div>
          </div>
          
          <div className="spot-images-container">
            <div className="spot-images-left">
              {/* grab first img from array, if none, grab placeholder */}
              <img src={firstImage} alt={spot.name} className="main-image" />
            </div>
            <div className="spot-images-right-container">
              <div className="spot-images-right-grid">
                 {/* grab remaining images from array, if none, grab placeholder */}
                {gridImages.map((img, index) => (
                  img.url ? (
                    <img 
                      key={index} 
                      src={img.url} 
                      className={`grid-image-${index + 1}`} 
                    />
                  ) : (
                    <div
                    key={index}
                    className={`grid-image-${index + 1} placeholder-icon`} 
                    >
                      <FaHome size={120}/>
                    </div>
                  )
                  
                ))}
              </div>
            </div>
          </div>
          
          <div className="spot-info-container">
            <div className="spot-host-desc">
              <div className="spot-host">
                Hosted by {spot.Owner.firstName || 'Unknown Host'} {spot.Owner.lastName}
              </div>
              <div className='spot-description'>
                {spot.description}
              </div>
            </div>

            <div className='spot-reserve-container'>

              <div className="spot-reserve-info">
                <p className="spot-price">
                  {currencyFormat(spot.price)} 
                  <span style={{ fontSize: '15px' }}>per night</span>
                </p>
                <div className='spot-rating'>
                  {averageStars ? (
                  <p><FaRegStar /> {averageStars} · {reviews.length} review{reviews.length > 1 ? 's' : ''}</p>
                  ) : (<p><FaRegStar /> New</p>)}
                </div>
              </div>

              <div className="spot-reserve-button">
                <button className="reserve-btn" onClick={() => alert('Coming Soon!')}>
                  Reserve
                </button>
              </div>

            </div>
          </div>

          <hr />

          <div className="spot-details-reviews-container">
              <div className="spot-details-reviews">
                <button 
                  className="spot-create-review"
                  onClick={() => alert('Coming Soon!')}
                >Post Your Review</button>
                <Reviews reviews={spot.Reviews || []} />
              </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default SpotDetails;
