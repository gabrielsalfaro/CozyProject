// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

  const closeMenu = (e) => {
    if (ulRef.current && !ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  // show me toggle state
  // useEffect(() => {
  // console.log('Menu state changed:', showMenu);
  // }, [showMenu]);

  // clg full redux state
  // const state = useSelector(state => state); 
  // const logState = () => {
  //   console.log('Full Redux state: ', JSON.stringify(state, null, 2));
  // };

  return (
    <>
    <div className="profile-button-container">
      <div className="profile-button-bars" onClick={toggleMenu}>
        <button >
          <FaBars size={25} />
          <FaUserCircle size={25} />
        </button>
      </div>
      
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="user-info-container">
            <li >Hello, <span style={{ fontWeight: 'bold' }}>{user.username}</span></li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <hr />
             <NavLink to="/spots/current" onClick={closeMenu} className={'manage-spots-navlink'}>Manage Spots</NavLink>
            <li style={{color: 'gray'}}>Manage Reviews</li>
            <hr />
            <li>
              <button onClick={logout} className='logout-button'>Log Out</button>
            </li>
          </div>
            
          </>
        ) : (
          <>
          <div className="user-login-signup">
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal onLoginSuccess={() => navigate('/')} />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </div>
          </>
        )}
        {/* <button onClick={logState}> debug: state </button> */}
      </ul>
    </div>
    </>
  );
}

export default ProfileButton;