import { useState, useEffect, useMemo } from 'react';
import SpotCard from '../SpotCard/SpotCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import './Home.css'

function Home() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const memoizedSpots = useMemo(() => Object.values(spots), [spots]);

  useEffect(() => {
    setLoading(true);
    const loadSpots = async () => {
      try {
        await dispatch(fetchSpots());
      } catch (err) {
        setError('Failed to load spots...');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

   if (memoizedSpots.length === 0) { 
      loadSpots();
    } else {
      setLoading(false); // to prevent infinite loading (fixes navigation)
    }
    return () => {
      setLoading(true);
    };

  }, [dispatch, memoizedSpots.length]);

  if (loading) return <p>Loading spots...</p>;
  if (error) return <p>{error}</p>;

  const sortedSpots = [...memoizedSpots].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <>
      <br />
      <div className="spots-grid">
        {sortedSpots.map(spot => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    </>
  );
}

export default Home;
