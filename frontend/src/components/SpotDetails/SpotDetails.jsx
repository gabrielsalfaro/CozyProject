import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSingleSpot } from '../../store/spots';
import './SpotDetails.css';
// import Reviews from '../Reviews/Reviews'

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

  const previewImage = spot.previewImage || spot.SpotImages?.find(img => img.preview)?.url;

  return (
    <>
      <div className='spot-name'>{spot.name}</div>
      <div>{spot.city}, {spot.state}, {spot.country}</div>
      <div className="spot-image">
        <img src={previewImage} alt={spot.name} />
      </div>
      <div>
        <div className="spot-host">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
        <div>{spot.description}</div>
      </div>
      <div>
        <p className="price">{currencyFormat(spot.price)}</p>
        <div>Avg. rating: {spot.avgRating}</div>
        <button className="reserve" onClick={() => alert('Coming Soon!')}>Reserve</button>
      </div>
      {/* <Reviews /> */}

    </>
  );
}

export default SpotDetails;
