import React, { useState, useContext } from 'react';
import '../index.css'
import logo from '../assets/images/logos/logo.svg';
import AuthContext from '../context/AuthContext';
import { BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Activate() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  let{authTokens}= useContext(AuthContext)
  const { studentInfo } = useSelector((state) => state.user);
  console.log(studentInfo)
  const handleSubmit = async(event) => {
    event.preventDefault();
   if(password === password1){
    let response1 = await fetch(`${BASE_URL}/auth/users/set_password/`, {
      method: 'POST',
      headers: {
        'Authorization':  `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_password: password, current_password: 'test@123' }),

    });


    const response3 = await fetch(`${BASE_URL}/parents/remove_first_login/`, {
      method: 'POST',
      headers: {
        'Authorization':  `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: studentInfo.id}),

    });

   
    toast.success('Password Successfully Changed!')
    navigate('/login')
   }
   else{
    toast.error('Passwords Don\'t Match')
   }
 
  
   

   
  };

  return (
    <div className="login-container">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <div className="logo-container">
              <img src={logo} alt="Bright School Logo" />
              <h3>Hello, {studentInfo.username}!</h3>
              <h3>Activate Your Account</h3>
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
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Confirm Password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
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
               Activate
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

export default Activate;
