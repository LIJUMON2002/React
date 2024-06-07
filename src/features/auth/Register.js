import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from './authSlice';
import "./Style.css"

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, password, email })).then((result) => {
      if (register.fulfilled.match(result)) {
        navigate('/login');
      }
    });
  };
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='input-group'>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='input-group'>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className='login-button' type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className='error-msg'>
          {error && <p>{error}</p>}
        </div>
        <button onClick={handleLogin} className='login-button' type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
