// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navigation-container'>
      <li className='navigation-home'>
        <NavLink to="/">Cozy</NavLink>
      </li>
      
      <li className='spacer'>{/* SPACER */}</li>
      {isLoaded && (
        <li className='navigation-profile'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;