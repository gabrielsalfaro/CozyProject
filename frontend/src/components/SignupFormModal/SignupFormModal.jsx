import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const emptyFields = (
    !email.trim() ||
    !username.trim() || (username.trim().length < 4) ||
    !firstName.trim() ||
    !lastName.trim() ||
    !password.trim() || (password.trim().length < 6) ||
    !confirmPassword.trim()
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
    <div className="modal-container" onClick={() => closeModal()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h1 className="modal-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <label>
          {/* Email */}
        {errors.email && <p className="error-message">{errors.email}</p>}

          <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Username */}
        {errors.username && <p className="error-message">{errors.username}</p>}

          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          {/* First Name */}
        {errors.firstName && <p className="error-message">{errors.firstName}</p>}

          <input
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Last Name */}
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}

          <input
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Password */}
        {errors.password && <p className="error-message">{errors.password}</p>}

          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Confirm Password */}
        {errors.confirmPassword && (<p className="error-message">{errors.confirmPassword}</p>)}

          <input
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button 
          disabled={emptyFields}
          type="submit" 
          className='signup-button'>Sign Up
        </button>
      </form>
      </div>
      </div>
    </>
  );
}

export default SignupFormModal;