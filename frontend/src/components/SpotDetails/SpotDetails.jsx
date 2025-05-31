import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SpotDetails() {
  const { spotId } = useParams();  // extract spotId from URL
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    // Replace this with your actual API or state logic
    fetch(`/api/spots/${spotId}`)
      .then(res => res.json())
      .then(data => setSpot(data))
      .catch(err => console.error(err));
  }, [spotId]);

  if (!spot) return <p>Loading...</p>;

  return (
    <>
    <h1>Spot Details</h1>
      <div>{spot.id}</div>
      <div>{spot.name}</div>
      <div>{spot.address}</div>
      <div>{spot.city}</div>
      <div>{spot.state}</div>
      <div>{spot.description}</div>
      <div>{spot.price}</div>
      <div>{spot.avgRating}</div>
      <div>{spot.spotImages}</div>
      <div>{spot.owner}</div>
    </>
  );
}

export default SpotDetails;
