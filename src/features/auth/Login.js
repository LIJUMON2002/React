import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/crud');
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  const handleRegister = () => {
    navigate('/register'); // Redirect to login page after logout
  };


  return (
    <div className='container'>
      <div className='heading'>
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='input-group'>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='login-button' type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className='error-msg'>
          {error && <p>{error}</p>}
        </div>
        <button onClick={handleRegister} className='login-button' type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;