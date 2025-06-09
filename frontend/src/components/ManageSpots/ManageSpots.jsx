import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import SpotCard from '../SpotCard/SpotCard';
import './ManageSpots.css';

const ManageSpots = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spotsObj = useSelector(state => state.spots.allSpots);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpots = async () => {
      await dispatch(fetchSpots());
      setLoading(false);
    };
    loadSpots();
  }, [dispatch]);

  // filter after spots load. fixes refesh
  const spots = Object.values(spotsObj).filter(
    spot => spot.ownerId === sessionUser?.id
  );

  if (loading) return <p>Loading your spots...</p>;

  return (
    <div className="manage-spots-container">
      <h1 className='h1-title'>Manage Your Spots</h1>
      <div className="create-spot-button-wrapper">
        <NavLink to="/spots/new" className="create-new-spot-button">
          Create a New Spot
        </NavLink>
      </div>
      <div className="spots-grid">
        {spots.length > 0 ? (
          spots.map(spot => (
            <div key={spot.id} className="manage-spot-card-wrapper">
              <SpotCard spot={spot} />
              <div className="manage-spot-buttons">
                <button className="update-spot">Update</button>
                <button className="delete-spot">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>You don&apos;t have any spots listed yet.</p>
        )}
      </div>
    </div>
  );
};

export default ManageSpots;
