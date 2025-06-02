import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navigation-container">
      <ul className="navigation-list">
        <li className="navigation-home">
          <NavLink to="/">COZY</NavLink>
        </li>
        <li className="navigation-spacer"></li>

        {isLoaded && sessionUser && (
          <>
            <li className="navigation-create-spot">
              <NavLink to="/spots/new">Create a New Spot</NavLink>
            </li>
            <li className="navigation-profile">
              <ProfileButton user={sessionUser} />
            </li>
          </>
        )}

        {isLoaded && !sessionUser && (
          <li className="navigation-profile">
            <ProfileButton user={null} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
