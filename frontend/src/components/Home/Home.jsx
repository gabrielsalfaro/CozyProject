import { useState, useEffect } from 'react'
import SpotCard from '../SpotCard/SpotCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
// import SpotDetails from '../SpotDetails/SpotDetails';

function Home() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    const [loading, setLoading] = useState(true); // init true or false?
    const [error, setError] = useState(null);
  
    useEffect(() => {
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
  
      loadSpots();
    }, [dispatch]);
  
    if (loading) return <p>Loading spots...</p>;
    if (error) return <p>{error}</p>;
  
    return (
        <>Available Spots
        <div className="spots-grid"> 
        {spots.map(spot => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
        </>
      
    );
  }
  
  export default Home;
