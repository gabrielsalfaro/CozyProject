// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router-dom';

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
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="user-info-container">
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </div>
            
          </>
        ) : (
          <>
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
          </>
        )}
        {/* <button onClick={logState}> debug: state </button> */}
      </ul>
    </div>
    </>
  );
}

export default ProfileButton;