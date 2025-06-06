import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
// import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormModal({ onLoginSuccess }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        closeModal();
        if (onLoginSuccess) onLoginSuccess(); 
      })
      .catch(async (res) => {
        if (res && res.status === 401) {
          setErrors({ credential: 'The provided credentials were invalid' });
        } else if (res && typeof res.json === 'function') {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        } else {
          setErrors({ credential: 'An unexpected error occurred' });
        }
      });
  };

  // if (credential < 4) {button.login-button = 'disabled'}
  // let userMin = credential.length < 4 && password.length < 6;

  const handleDemoLogin = () => {
    return dispatch(sessionActions.login({
      credential: 'demo',
      password: 'password'
    }))
      .then(() => {
        closeModal();
        if (onLoginSuccess) onLoginSuccess(); 
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };


  return (
    <div className="modal-container" onClick={() => closeModal()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">Log In</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {errors.credential && <p className="error-message">{errors.credential}</p>}
          <label>
            
            <input
              type="text"
              placeholder='Username or Email'
              value={credential}
              onChange={(e) => {setCredential(e.target.value); 
                // console.log(credential.length)
              }}
              required
            />
          </label>
          <label>
            
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          
          <button 
          type="submit" 
          className="login-button"
          disabled={credential.length < 4 || password.length < 6}
          >Log In</button>
        </form>
        <div className="demo-user-container">
          <a href="#" className="demo-user" onClick={(e) => {
            e.preventDefault();
            handleDemoLogin();
            }}>
            Demo User
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginFormModal;
