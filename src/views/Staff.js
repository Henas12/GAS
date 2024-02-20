import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../index.css'
import logo from '../assets/images/logos/logo.svg'
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
   
    loginUser(username, password);
   
  };

  return (
    <div className="login-container">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <div className="logo-container">
              <img src={logo} alt="Bright School Logo" />
              <h1>Sign In</h1>
            </div>
          
           
            <div className="mb-3">
              <label>Username address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default Login;
